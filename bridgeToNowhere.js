// General Variables
var longestIncreasingSubsequence = [];
var maxNumberOfBriges;
var n;
var permutaions = [];

// Functions
function lis(arr) {
    var lis = [];
    var i, j, max = 0;

    // Initialize LIS values for all indexes
    for ( i = 0; i < arr.length; i++ ) {
        lis.push(1); 
    }

    // Compute LIS 
    for ( i = 1; i < arr.length; i++ ) {
        for ( j = 0; j < i; j++ ) {
            if ( arr[i] > arr[j] && lis[i] < lis[j] + 1) {
                lis[i] = lis[j] + 1;
            }
        }
    }

    // Pick maximum of all LIS values
    for ( i = 0; i < arr.length; i++ ) {
        if ( max < lis[i] ) 
            max = lis[i];
    }

    longestIncreasingSubsequence = lis;
    maxNumberOfBriges = max;
}

// Colors
var blue = "#2B8BD1";
var white = '#FFFFFF';
var yello = '#B58A22';
var green = '#859916';

// Initialize canvas and draw chart
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = '15px serif';
ctx.fillStyle = blue;

// Draw River
ctx.beginPath();
ctx.lineWidth="4";
ctx.strokeStyle="#95BFE2";
ctx.fillStyle = 'aliceblue';
ctx.fillRect(3,80,2670,250);
ctx.strokeRect(3,80,2670,250);
ctx.fillStyle = blue;
ctx.font = '90px serif';
ctx.fillText("River", 500, 250);

// Event Listeners
$("#next").click(function() {
    // Get Number of Cities (n)
    n = Number($("#n").val());
    // Check input values validity
    if (!n || n > 100 || n <= 0) {
        alert("Please Enter a Valid Number Of Cities (n)");
        return;
    }
    $("#next").attr("disabled", "true");
    // Add fields for Permutation of Cities
    for (let i = 1; i <= n; i++) {
        $("#permutaions").append("p" + i + ":<input class='permutation-field' type='text'>");
    }
    // Draw northen cities
    ctx.font = '15px serif';
    for (let i=1, j=0, c=2; i<=n; i++, j+=27, c+=27) {
        ctx.fillStyle = blue;
        ctx.fillRect(j, 10, 25, 25);
        ctx.fillStyle = white;
        ctx.fillText('a'+ i, c, 27);
    }
});

$("#run").click(function() {
    if (!n) {
        alert('Please Enter n !');
    }
    // Store Permutaion in an array
    $(".permutation-field").each(function() {
        permutaions.push(Number($(this).val()));
    });
    // Draw southern cities
    ctx.font = '15px serif';
    for (let i=0, j=0, c=2; i<permutaions.length; i++, j+=27, c+=27) {
        ctx.fillStyle = green;
        ctx.fillRect(j, 370, 25, 25);
        ctx.fillStyle = white;
        ctx.fillText('b'+ permutaions[i], c, 390);
    }
    lis(permutaions);
    $("#result").append(
        "<h2>Maximum Number Of Briges: <b>" + maxNumberOfBriges + "</b></h2>"
    );
    
    // Draw briges
    let max = maxNumberOfBriges;
    let cityNumber;
    ctx.strokeStyle = "black";
    for (let i = longestIncreasingSubsequence.length; i >= 0; i--) {
        if (longestIncreasingSubsequence[i] === max) {
            cityNumber = permutaions[i];
            ctx.beginPath();
            ctx.moveTo(13 + ((cityNumber - 1) * 27), 35);
            ctx.lineTo(13 + (i * 27), 370);
            ctx.stroke();
            max--;
        }
    }

    // Disable run button
    document.getElementById("run").setAttribute("disabled", "true");
});