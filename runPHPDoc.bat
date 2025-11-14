@ECHO OFF
REM genera la documentación PHP del proyecto utilizando phpDocumentor
C:\wamp64\bin\php\php8.3.14\php.exe phpDocumentor.phar run -d src/ -t docs/api