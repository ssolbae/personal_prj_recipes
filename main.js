$(document).ready(function(){
  $('a.back').click(function(){
		parent.history.back();
		return false;
	});

  $.get("https://3r7gikaz7d.execute-api.us-east-1.amazonaws.com/prod/RecipeList?TableName=RecipesList", function(data, status){
      // alert("Data: " + data + "\nStatus: " + status);
      var showRecipeBox = $(".showRecipeBox");
      for (var i = 0; i < data.Count; i++) {
        (function () {
          var oneRecipe = data.Items[i];
          var card = $('<div class="card"></div>');
          var justTitle = JSON.stringify(oneRecipe.RecipeName).replace(/\"/g, "");
          var justImage = JSON.stringify(oneRecipe.Image);
          var image = $('<img src=' + justImage + 'alt="recipe image" class="image";">');
          var title = $('<p class="title">' + '<img class="circular--square" src=' + justImage + '/><strong>' + justTitle + '</strong></p>');
          var ingredients = JSON.stringify(oneRecipe.Ingredients).replace(/\\r\\n/g, "<br>").replace(/\"/g, "");
          var directions = JSON.stringify(oneRecipe.Directions).replace(/\\r\\n/g, "<br>").replace(/\"/g, "");

//           var fontSize = parseInt($(".title").height())+"px";
// // alert(fontSize);
//           $(".title").css('font-size', fontSize)


          var recipeButton = $('<button type="submit" class="mainButtons btn btn-primary";>Recipe</button>');
          var ingredientsButton = $('<button type="submit"' + '<id="' + i + '"' + 'class="mainButtons btn btn-default";>Ingredients</button>');
          var column = $('<div class="col-sm-4"></div>');
          var row = $('<div class="row"></div>');

          card.append(title);
          card.append(image);
          card.append("<br/>");
          card.append(recipeButton);
          card.append(ingredientsButton);

          if (i%3 == 0) {
            showRecipeBox.append(row);
          }
          showRecipeBox.append(column);
          column.append(card);


          recipeButton.click(function() {
            $(".homeBox").addClass("hidden");
            ingredientsButton.remove();
            recipeButton.remove();
            $(".navButton1").remove();
            $("#navButton").append($('<li><a href="index.html">SEARCH</a></li>'));

            $("#basicInfo").append(card);
            $("#recipes").append($('<h3>Ingredients</h3><hr>'));
            $("#recipes").append(ingredients);
            $("#recipes").append($('<br><h3 style="margin-top:50px;">Directions</h3><hr>'));
            $("#recipes").append(directions);
          });

          ingredientsButton.click(function() {
            $(".homeBox").addClass("hidden");
            ingredientsButton.remove();
            recipeButton.remove();

            // $("#basicInfo").append(card);
            $("#basicInfo").append($('<h3>Ingredients</h3><hr>'));
            $("#basicInfo").append(ingredients);


          });
        })();
      }
  });
});
