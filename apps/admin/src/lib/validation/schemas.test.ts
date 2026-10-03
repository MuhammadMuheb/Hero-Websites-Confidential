import { describe, expect, it } from "vitest";
import { projectCreateSchema, projectUpdateSchema } from "./schemas";

const base = { name: "Rome Vespa", slug: "rome-vespa", domain: "", publicUrl: "", status: "coming_soon", contactEmail: "hello@romevespa.com", logoUrl: "" };

describe("project domain", () => {
  it("is lower-cased and loses www, because www.example.com and example.com are one site", () => {
    expect(projectCreateSchema.parse({ ...base, domain: "WWW.RomeVespa.com" }).domain).toBe("romevespa.com");
    expect(projectUpdateSchema.parse({ ...base, domain: " romevespa.com " }).domain).toBe("romevespa.com");
  });

  it("may be empty (a project that has no domain yet)", () => {
    expect(projectCreateSchema.parse(base).domain).toBe("");
  });

  it("rejects anything that is not a bare hostname", () => {
    for (const bad of ["https://romevespa.com", "romevespa.com/path", "romevespa.com:3000", "localhost", "rome vespa.com", "-bad.com"]) {
      expect(projectCreateSchema.safeParse({ ...base, domain: bad }).success, bad).toBe(false);
    }
  });
});

describe("project slug", () => {
  it("cannot be one of the routes under /projects", () => {
    expect(projectCreateSchema.safeParse({ ...base, slug: "new" }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ ...base, slug: "edit" }).success).toBe(false);
    expect(projectCreateSchema.safeParse({ ...base, slug: "rome-vespa" }).success).toBe(true);
  });
});
