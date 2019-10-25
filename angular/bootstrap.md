# Bootstrap and Angular

## Simple cases (CSS only)

### Import Directly from CDN

You can insert CSS directly from CDN inserting them into the root HTML file.

**index.html** - Full CSS
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```

**index.html** - Layout only CSS
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap-grid.min.css">
```

## Base Responsive Layout

An example of rows that in small screens each column is full-width, but in `md` screens and above they fallback to 1/3 (aka 4/12).

```
<div class="container-fluid">
    <div class="row">
        <div class="col-12 col-md-4"><p>Item 1</p></div>
        <div class="col-12 col-md-4"><p>Item 2</p></div>
        <div class="col-12 col-md-4"><p>Item 3</p></div>
        <div class="col-12 col-md-4"><p>Item 4</p></div>
        <div class="col-12 col-md-4"><p>Item 5</p></div>
    </div>
</div>
```
