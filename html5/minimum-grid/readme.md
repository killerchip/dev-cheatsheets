# A minimum grid system

This is a very minimum grid system that you can apply in simple cases and you do not wish to include a full-force commercial framework.

It is using a 12-column grid.

![](./columns.png)

## How to use

1. Copy the contents of `my-fmw/grid.css` into your project.
1. Reference it from your HTML5 page: `<link rel="stylesheet" href="grid.css">`
1. Enclose your layout in `grid` class so you can define a maximum width
1. Create your rows with `row` class
1. Define your colums with `col-1` to `col-11` classes

## Example

_[home.html](./home.html)_

```
<!DOCTYPE html>

<!--
    Demo page that demonstrates the use of a simple Grid framework.
-->

<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Grid test</title>
    <!-- This is the actual grid imported -->
    <link rel="stylesheet" href="./my-fmw/grid.css">

    <!-- Additional stylesheet to help visualize the grid system-->
    <link rel="stylesheet" href="./grid-test.css">
</head>

<body>

    <div class="grid">
        <div class="row">
            <div class="col-1">1/12</div>
            <div class="col-11">11/12</div>
        </div>

        <div class="row">
            <div class="col-2">2/12</div>
            <div class="col-10">10/12</div>
        </div>

        <div class="row">
            <div class="col-3">3/12</div>
            <div class="col-9">9/12</div>
        </div>

        <div class="row">
            <div class="col-4">4/12</div>
            <div class="col-8">8/12</div>
        </div>

        <div class="row">
            <div class="col-5">5/12</div>
            <div class="col-7">7/12</div>
        </div>

        <div class="row">
            <div class="col-6">6/12</div>
            <div class="col-6">6/12</div>
        </div>
    </div>

</body>

</html>
```

> See it in action at [CodeSandbox](https://codesandbox.io/s/a-minimum-grid-system-58vg8)
