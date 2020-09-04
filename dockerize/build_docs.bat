del /S /Q ..\docs\*.*
call build_web.bat
pause
copy dist\data-to-code-prod-ui\*.* ..\docs\
call build_code_documentation.bat
xcopy source ..\docs\source /S /I /Y
