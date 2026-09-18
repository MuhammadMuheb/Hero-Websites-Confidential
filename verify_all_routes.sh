#!/bin/bash

echo "=== Verifying all 13 network properties ==="
echo ""

# Extract all PROPERTY_TOURS entries
grep -A 200 "export const PROPERTY_TOURS" apps/web/src/lib/tours.ts | \
grep -E "^\s+'[a-z-]+': \[|label:|href:" | \
awk '
  /'\''[a-z-]+'\'':/ { 
    property = $2
    gsub(/[:,]/, "", property)
    gsub(/'\''/, "", property)
  }
  /label:/ {
    label = $0
    gsub(/.*label: '\''|'\''.*/,"", label)
  }
  /href:/ {
    href = $0
    gsub(/.*href: '\''|'\''.*/,"", href)
    print property ": " label " -> " href
  }
' | head -50
