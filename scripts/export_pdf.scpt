on run argv
    set inputFile to POSIX file (item 1 of argv) as alias
    set outputFile to item 2 of argv
    
    tell application "Pages"
        activate
        set theDoc to open inputFile
        
        -- Export to PDF
        export theDoc to POSIX file outputFile as PDF
        
        close theDoc saving no
    end tell
end run
