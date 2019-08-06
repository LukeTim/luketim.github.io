//import { $, jQuery } from "jquery";
import { CountUp } from "countUp.js";


var choice = 0; //1 = 1p, 2 = £1,000,            
var game_el = document.getElementById('game');
var switched = false;

var nums = ["one", "two", "three", "four", "five", "six"];

function SetChoice(c)
{
    console.log("Choice Set");
    choice = c;

    SetVisible();

    NextStep(2);
}

function SwitchChoice(s)
{
    choice = (choice % 2) + 1;
    switched = true;

    SetVisible();

    NextStep(s);
}

function SetVisible() {
    var choice_str = nums[choice-1];
    $("." + choice_str).show();

    var not_choice = (choice % 2) + 1;
    var not_choice_str = nums[not_choice-1];
    $("." + not_choice_str).hide();

    $("." + choice_str + "_original").hide();
    $("." + not_choice_str + "_original").hide();
    $("." + choice_str + "_switch").show();
    $("." + not_choice_str + "_switch").hide();
}

function NextStep(s)
{
    var new_div = "#" + nums[s];
    
    $("#" + nums[s-1]).fadeOut(200, () => {
        $("#transition").fadeIn(200, () => {
            setTimeout(() => {
                $("#transition").fadeOut(200, () => {
                    
                    $(new_div).fadeIn(200, () => {
                        if(new_div == "#six") {
                            var val = 5368709.12;
                            if(choice == 2)
                            {
                                val = 30000;
                            }
                            var countUp = new CountUp('count', val);
                            countUp.start();
                        }
                    });
                });
            }, 2000);
        });
    });

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

jQuery(document).ready(() => {
    var comp = 1;
    var thou = 1000;
    for(i = 0; i < 30; i++)
    {
        $("#tabled").append("<tr><td>" + (i+1) + "</td><td>£" + numberWithCommas(comp/100.0) + "</td><td>£" + numberWithCommas(thou) + "</td></tr>");
        comp *= 2;
        thou += 1000;
    }
});