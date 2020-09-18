var http = require('http');
var fs = require('fs');
var express = require('express');
var qs = require('querystring');
var ejs = require('ejs');
var app = express();
var fs = require('fs');
var path = require('path');
var f_arr = new Array();
var f2_arr = new Array();
var parser = require("csv-parse/lib/sync");
var result = new Array();
var food_result = new Array();
var img_arr = new Array();
var recipe_arr = new Array();
var food;
var food_image;
var food_name;
var food_id = new Array();
var main_ing = new Array();
var sub_ing = new Array();
var main_ing1 = new Array();
var sub_ing1 = new Array();
var less_ing1 = new Array();
var less_ing2 = new Array();
var food_recipe;
var time_arr = new Array();
var time;
var difficulty_arr = new Array();
var difficulty;

app.set('port', 5000);
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(__dirname + '/secure_web'));

app.use(express.static(__dirname + '/image'));

app.get('/code', function(req,res){
    res.render('../secure_web/code/main.html');
});

app.get('/code/arr_1', function(req, res){
    var check = 0;
    var csv = fs.readFileSync("./ing.csv");
    var data = parser(csv.toString("utf-8"));
    for(var i = 0; i<data[0].length;i++){
        if(req.query.food == data[0][i]){
            check=1;
            for(var j=0;j<f_arr.length;j++){
                if(req.query.food == f_arr[j]){
                    check = 2;
                }
            }
        }
    }
    if(check == 1){
        var id = req.query.food;
        f_arr.push(id);
    }
    check=0;
    res.render('../secure_web/code/stage1.html', {FoodArray:f_arr, FoodArray2:f2_arr});
})

app.get('/code/arr_1-2', function(req, res){
    var check = 0;
    var csv = fs.readFileSync("./ing.csv");
    var data = parser(csv.toString("utf-8"));
    for(var i = 0; i<data[0].length;i++){
        if(req.query.food2 == data[0][i]){
            check = 1;
            for(var j=0;j<f2_arr.length;j++){
                if(req.query.food2 == f2_arr[j]){
                    check = 2;
                }
            }
        }
    }
    if(check == 1){
        var id2 = req.query.food2;
        f2_arr.push(id2);
    }
    check=0;
    res.render('../secure_web/code/stage1.html', {FoodArray:f_arr,FoodArray2:f2_arr});
})

app.get('/code/arr_3', function(req, res){
    var csv = fs.readFileSync("./ing.csv");
    var data = parser(csv.toString("utf-8"));
    for(var i = 0; i<f_arr.length;i++){
        for(var j = 0;j<data[0].length;j++){
            if(f_arr[i] == data[0][j]){
                result[j]=5;
            }
            if(result[j] !=5 & result[j] !=1){
                result[j] = 0;
            }
        }
    }
    for(var i = 0; i<f2_arr.length;i++){
        for(var j = 0;j<data[0].length;j++){
            if(f2_arr[i] == data[0][j]){
                result[j]=1;
            }
            if(result[j]!=5 & result[j]!=1){
                result[j]=0;
            }
        }
    }
    result.splice(0,1);
    
    fs.writeFile('output.csv', result, 'utf8', function(err){
        if(err){
            console.log("Sorry!!");
        } 
        else{
            let {PythonShell} = require('python-shell');
var f3_arr = new Array();

var mysql = require('mysql');

var connection = mysql.createConnection({
    //connectionLimit: 10,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'hjw201520987!',
    database: 'food_recipe',
    debug: false
});

var options={
    mode:'text',
    pythonPathL:'',
    pythonOptions:['-u'],
    scriptPath:'',
};

PythonShell.run('food recipe.py', options, function(err, results){
    if(err) throw err;
    if(results==1){
        food_result=['0'];
        img_arr=['/image/657.jpg'];
        res.render('../secure_web/code/stage2.html', {result:food_result, imgArray:img_arr});
        result=[];
        food_result=[];
        img_arr=[];
    }
    else{
        food_id=results;
        console.log(results);
        recipe_arr=[];
        time_arr=[];
        difficulty_arr=[];
        connection.query('SELECT * from food_info', function(err, rows, fields) {
        for(var i=0;i<results.length;i++){
            if (!err)
            {
                console.log(rows[results[i]-1].name);
                food=rows[results[i]-1].name;
                food_image=rows[results[i]-1].image;
                food_recipe=rows[results[i]-1].recipe;
                time=rows[results[i]-1].time;
                difficulty=rows[results[i]-1].difficulty;
                food_result.push(food);
                img_arr.push(food_image);
                recipe_arr.push(food_recipe);
                time_arr.push(time);
                difficulty_arr.push(difficulty);
            }
            
            else
                console.log('Error while performing Query.', err);
        }
            res.render('../secure_web/code/stage2.html', {result:food_result, imgArray:img_arr});
            food_arr=food_result;
            image_array=img_arr;
            result=[];
            food_result=[];
            img_arr=[];
        });
    }
})
        }
    })
});

app.get('/code/init', function(req, res){
    console.log("check");
    f_arr = [];
    f2_arr = [];
    main_ing=[];
    sub_ing=[];
    main_ing1=[];
    sub_ing1=[];
    less_ing1=[];
    less_ing2=[];
    food_id=[];
    recipe_arr=[];
    time_arr=[];
    difficulty_arr=[];
    res.render('../secure_web/code/stage1.html', {FoodArray:f_arr, FoodArray2 : f2_arr});
    });

app.get('/code/arr_2-2', function(req, res){
    console.log("check1");
    f_arr = [];
    f2_arr = [];
    result=[];
    food_result=[];
    img_arr=[];
    main_ing=[];
    sub_ing=[];
    main_ing1=[];
    sub_ing1=[];
    less_ing1=[];
    less_ing2=[];
    food_id=[];
    recipe_arr=[];
    time_arr=[];
    difficulty_arr=[];
    res.render('../secure_web/code/stage1.html', {FoodArray:f_arr, FoodArray2 : f2_arr});
    });

app.get('/code/arr_2-3', function(req, res){
    console.log("check1");
    f_arr = [];
    f2_arr = [];
    result=[];
    food_result=[];
    img_arr=[];
    main_ing=[];
    sub_ing=[];
    main_ing1=[];
    sub_ing1=[];
    less_ing1=[];
    less_ing2=[];
    food_id=[];
    recipe_arr=[];
    time_arr=[];
    difficulty_arr=[];
    res.render('../secure_web/code/main.html', {FoodArray:f_arr, FoodArray2 : f2_arr});
    });

app.post('/code/arr_3-1', function(req, res){
    var id=req.query.id;
    var check1 = fs.readFileSync("./recipe2.csv");
    var data1 = parser(check1.toString("utf-8"));
    var check2 = fs.readFileSync("./output.csv");
    var data2 = parser(check2.toString("utf-8"));
    
    food_image=image_array[id];
    food_name=food_arr[id];
    i=food_id[id];
    food_recipe=recipe_arr[id];
    time=time_arr[id];
    difficulty=difficulty_arr[id];
    
    for(var j = 0; j<data1[i].length-3;j++){
        if(data1[i][j+2] == 5){
            main_ing.push(data1[0][j+2]);
        }
        else if(data1[i][j+2] == 1){
            sub_ing.push(data1[0][j+2]);
        }
        
        if(data1[i][j+2]==5 && data2[0][j] == 5){
            main_ing1.push(data1[0][j+2]);
        }
        else if(data1[i][j+2]==1 && data2[0][j] == 5){
            main_ing1.push(data1[0][j+2]);
        }
        else if(data1[i][j+2]==5 && data2[0][j] == 1){
            sub_ing1.push(data1[0][j+2]);
        }
        
        else if(data1[i][j+2]==1 && data2[0][j] == 1){
            sub_ing1.push(data1[0][j+2]);
        }
        
        if((data1[i][j+2] == 5) && (data2[0][j] == 0)){
            less_ing1.push(data1[0][j+2]);
        }
        else if((data1[i][j+2] == 1) && (data2[0][j] == 0)){
            less_ing2.push(data1[0][j+2]);
        }
    }
    res.render('../secure_web/code/stage3.html', {imgArray:food_image, recipeArray:food_name, main_ing:main_ing, sub_ing:sub_ing, main_ing1:main_ing1, sub_ing1:sub_ing1, less_ing1:less_ing1, less_ing2:less_ing2, recipe:food_recipe, time:time, difficulty:difficulty});
    main_ing=[];
    sub_ing=[];
    main_ing1=[];
    sub_ing1=[];
    less_ing1=[];
    less_ing2=[];
    });

app.get('/code/arr_3-2', function(req, res){
    res.render('../secure_web/code/stage2.html');
});

var server = app.listen(5000, function(){
    console.log("Start");
});