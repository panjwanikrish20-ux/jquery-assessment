
/******** MODULE 1: Storage (File Handling Simulation using localStorage) ********/
const StorageModule = (function(){
    function saveData(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
    function getData(key){
        return JSON.parse(localStorage.getItem(key));
    }
    return {saveData, getData};
})();

/******** MODULE 2: Validation ********/
const ValidationModule = (function(){
    function isEmpty(value){
        return value === null || value === "";
    }
    return {isEmpty};
})();

/******** MODULE 3: Business Logic ********/
const AppModule = (function(){

    function showCountry(){
        try{
            let country = $("#country").val();

            if(ValidationModule.isEmpty(country)){
                alert("Please select a country");
                return;
            }

            StorageModule.saveData("country", country);

            alert("You have selected the country - " + country);
            $("#msg").text("Selected: " + country);

        } catch(e){
            alert("Error occurred, returning to menu");
        }
    }

    return {showCountry};

})();

/******** UI EVENT ********/
$("#show").click(function(){
    AppModule.showCountry();
});

/******** MENU SYSTEM (Loop until Exit using prompt) ********/
function menu(){
    let choice;

    do{
        try{
            choice = prompt(
                "MENU:\n1. Show Country Alert\n2. View Stored Data\n3. Exit"
            );

            switch(choice){
                case "1":
                    AppModule.showCountry();
                    break;

                case "2":
                    alert("Stored Country: " + StorageModule.getData("country"));
                    break;

                case "3":
                    alert("Exiting Program");
                    break;

                default:
                    alert("Invalid Option. Try again.");
            }

        } catch(err){
            alert("Unexpected error, returning to menu");
        }

    } while(choice !== "3");
}

// Start menu after page load
window.onload = function(){
    setTimeout(menu, 500);
};

