#!/usr/bin/env bash

set -e
echo beforeAll

#Make backups of the databases.
FILE=website.db
FILEDB=file.db
if test -f "$FILE"; then
    cp website.db websiteBackup.db
    rm -rf website.db
fi

if test -f "$FILEDB"; then
    cp file.db fileBackup.db
    rm -rf file.db
fi

if test -f "$FILEDB"; then
    cp file.db fileBackup.db
    rm -rf file.db
fi
