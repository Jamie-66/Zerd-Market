// ,
//   "moduleIds":true,
//   "plugins": ["babel-plugin-transform-es2015-modules-amd"]
// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');//压缩工具
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var mincss = require('gulp-minify-css');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');

// 检查脚本
gulp.task('lint', function() {
   gulp.src('dist/js/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

gulp.task('es6', function(){
    gulp.src('dist/es6/*.js')//es6 源文件
    .pipe(babel()) //执行 babel 将 es6 编译成 es5
    .pipe(gulp.dest('dist/js'))//编译成 es5 的文件存放目录
    .pipe(webpack({//将所有 es5 的文件编译成一个文件 all.js
      output:{
        filename:"all.js",
      },
      stats:{
        colors:true
      },
      module:{
        loaders:[{test: /\.js$/, loaders: ['babel']}]
      }
    }))
    .pipe(gulp.dest('build'));//将 all.js 存放到此目录
})


// 合并，压缩文件
gulp.task('minjs', function() {
    gulp.src('dist/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/common'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/common'));
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: '',
        port: 8081,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('*.html').pipe(connect.reload());
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('dist/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('build'))
        .pipe(rename('all.min.css'))
        .pipe(mincss())
        .pipe(gulp.dest('build'));        
});


//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    //前面是监听的文件，后面是调用的任务
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['dist/scss/*.scss'], ['sass']);
    gulp.watch(['dist/js/*.js'], ['html']);
    gulp.watch(['dist/css/*.css'], ['html']);
    gulp.watch(['dist/es6/*.js'], ['es6']);
});

gulp.task('default', function(){
    gulp.run('watch', 'connect','sass');
})