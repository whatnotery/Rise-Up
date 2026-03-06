#!/usr/bin/env zsh

# Simple: rename all jpg files to pizza-1.jpg, pizza-2.jpg, etc.

# Get all jpg files (case insensitive)
jpg_files=(*.(jpg|JPG|jpeg|JPEG)(.N))

# Check if any found
if [[ ${#jpg_files} -eq 0 ]]; then
    echo "No JPG files found"
    exit 1
fi

echo "Found ${#jpg_files} JPG files"

# Randomize order
jpg_files=(${(o)jpg_files})

# Rename starting at 1
counter=1
for file in $jpg_files; do
    ext="${file:e:l}"  # lowercase extension
    new_file=$(printf "pizza-%d.%s" $counter $ext)

    # Handle conflicts
    if [[ -e "$new_file" ]]; then
        echo "Warning: $new_file exists, skipping $file"
        ((counter++))
        continue
    fi

    mv -v "$file" "$new_file"
    ((counter++))
done

echo "Done! Renamed $((counter-1)) files"
