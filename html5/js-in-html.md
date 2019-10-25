# Javascript placement inside HTML document

An HTML Page example showcasing how you can insert/link javascript scripts inside an HTML document.

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Javascript placement in HTML document</title>
        <script>
            console.log("Script in HTML > head");
        </script>
        <script src="head.js"></script>
    </head>
    <body>
        <script>
            console.log("Script in HTML > body");
        </script>
        <script src="body.js"></script>
    </body>
</html>
```

You can have javascript directly inside the document (head / body) and/or import it from external files (head/body).
