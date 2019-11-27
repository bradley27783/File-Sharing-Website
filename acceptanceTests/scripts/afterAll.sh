#!/usr/bin/env bash

set -e
echo afterAll
#Delete the databases that were used for the acceptance testing.
FILE=website.db
FILEDB=file.db
if test -f "$FILE"; then
    rm -rf website.db
fi

if test -f "$FILEDB"; then
    rm -rf file.db
fi
#Restore the databases from before the acceptance tests were run, and delete the backups.
FILE=websiteBackup.db
FILEDB=fileBackup.db
if test -f "$FILE"; then
    cp websiteBackup.db website.db
    rm -rf websiteBackup.db
fi

if test -f "$FILEDB"; then
    cp fileBackup.db file.db
    rm -rf fileBackup.db
fi
