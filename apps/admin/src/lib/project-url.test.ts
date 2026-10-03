import { describe, expect, it } from "vitest";
import { projectLiveUrl } from "./project-url";

describe("projectLiveUrl", () => {
  it("prefers the public URL", () => {
    expect(projectLiveUrl({ publicUrl: "https://streetfoodrome.com", domain: "other.com" })).toBe("https://streetfoodrome.com");
    expect(projectLiveUrl({ publicUrl: "  https://example.com/path?x=1  ", domain: "" })).toBe("https://example.com/path?x=1");
  });

  it("falls back to https:// plus the domain", () => {
    expect(projectLiveUrl({ publicUrl: "", domain: "streetfoodrome.com" })).toBe("https://streetfoodrome.com");
    expect(projectLiveUrl({ publicUrl: "", domain: "sub.example.co.uk" })).toBe("https://sub.example.co.uk");
  });

  it("returns null when there is nothing safe to open", () => {
    expect(projectLiveUrl({ publicUrl: "", domain: "" })).toBeNull();
    expect(projectLiveUrl({ publicUrl: "", domain: "not a domain" })).toBeNull();
    expect(projectLiveUrl({ publicUrl: "", domain: "localhost" })).toBeNull();
  });

  it("never returns a non-https address", () => {
    expect(projectLiveUrl({ publicUrl: "http://example.com", domain: "" })).toBeNull();
    expect(projectLiveUrl({ publicUrl: "javascript:alert(1)", domain: "" })).toBeNull();
    expect(projectLiveUrl({ publicUrl: "data:text/html,hi", domain: "" })).toBeNull();
    expect(projectLiveUrl({ publicUrl: "//evil.com", domain: "" })).toBeNull();
    // An unsafe public URL does not block a valid domain.
    expect(projectLiveUrl({ publicUrl: "javascript:alert(1)", domain: "example.com" })).toBe("https://example.com");
  });
});
