//import { $, jQuery } from "jquery";
import { CountUp } from "countUp.js";
import { Chart } from "chart.js";
import 'bootstrap';


var choice = 0; //1 = 1p, 2 = £1,000,            
var game_el = document.getElementById('game');
var switched = false;
var compounded = [];
var thousands = [];

var nums = ["one", "two", "three", "four", "five", "six"];

function SetChoice(c)
{
    console.log("Choice Set");
    choice = c;

    SetVisible();

    NextStep(1);
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
                            $("#data").fadeIn(200);
                            var val = 5368709.12;
                            if(choice == 2)
                            {
                                val = 30000;
                            }
                            var options = {
                                decimalPlaces: 2,
                                prefix: '£'
                            }
                            var countUp = new CountUp('count', val, options);
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

$(document).ready(() => {
    var comp = 1;
    var thou = 10000;

    var years = [];

    for(var i = 0; i < 30; i++)
    {
        years[i] = (i+1);
        compounded[i] = comp/100.0;
        thousands[i] = thou;
        $("#tabled").append("<tr><td>" + (i+1) + "</td><td>£" + numberWithCommas(comp/100.0) + "</td><td>£" + numberWithCommas(thou) + "</td></tr>");
        comp *= 2;
        thou += 10000;
    }

    var chartCanvas = $("#chart");

    var chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Growth with Compounding',
                data: compounded,
                backgroundColor: '#9cffa4aa' ,
                borderColor: '#45FF54' 
            },
            {
                label: 'Linear Growth',
                data: thousands,
                backgroundColor: '#ff968faa' ,
                borderColor: '#FF4337' 
            }]
        },
        optiops: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Value'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Years'
                }
              }]
            }     
          }
    });

    $('#penny').click(() => {
        SetChoice(1);
    });
    $('#grand').click(() => {
        SetChoice(2);
    });
    $('.switch').click((e) => {
        var id = $(e.target).parent().parent().prop('id');
        var num = nums.indexOf(id);

        console.log($(e.target).prop("id") + " " + $(this).parent().prop("id") + " " + $(this).parent().parent().prop("id"));

        console.log("ID: " + id + " Number: " + num);

        SwitchChoice(num+1);
    });
    $('.next').click((e) => {
        var id = $(e.target).parent().parent().prop('id');
        var num = nums.indexOf(id);

        console.log("ID: " + id + " Number: " + num);

        NextStep(num+1);
    });
});