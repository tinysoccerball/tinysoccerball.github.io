const calculateMeanAbsoluteError = (y, x) => {
  if (y.length === 0 || y.length !== x.length) {
      return NaN;
  }
  let sum = 0;
  for (let i = 0; i < y.length; ++i) {
      sum += Math.abs(y[i] - x[i]);
  }
  return sum / y.length;
};


// Usage example:

//const y = [0,   1,   4,    9]; // expected values
//const x = [0.1, 0.9, 3.5, 10]; // actual values

//const error = calculateMeanAbsoluteError(y, x); // MAE

//console.log(error);  // 0.425

function loadFile(filePath) {
      var result = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", filePath, false);
      xmlhttp.send();
      if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
      }
      let csvArray = [];
      csvArray.push(result);
      csvArray = csvArray[0].split('\r\n');
      for(let i = 0; i < csvArray.length; i++){
        csvArray[i] = csvArray[i].split(',');
      }
      //console.table(csvArray);
      return csvArray;
    }

function uploadDealcsv () {}; 

  /*------ Method for read uploded csv file ------*/
  uploadDealcsv.prototype.getCsv = function(e) {
       
      let input = document.getElementById('myFile');
      input.addEventListener('change', function() {

        if (this.files && this.files[0]) {

            var myFile = this.files[0];
            var reader = new FileReader();
            
            reader.addEventListener('load', function (e) {
                
                let csvdata = e.target.result; 
                parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
            });
            
            reader.readAsBinaryString(myFile);
        }
      });
    }

    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function(data) {

        let parsedata = [];

        let newLinebrk = data.split("\r\n");
        for(let i = 0; i < newLinebrk.length; i++) {

            parsedata.push(newLinebrk[i].split(","))
        }
        let solutiondata = loadFile('https://tinysoccerball.github.io/BenchmarkSolutions.csv');
        console.log(solutiondata);
        //now we pull the x, y, z, data from the arrays so we can compare
        let expected = [];
        let received = [];
        for(i = 1; i < parsedata.length; i++){
          expected.push(solutiondata[i][2]);
          expected.push(solutiondata[i][3]);
          expected.push(solutiondata[i][4]);
          received.push(parsedata[i][2]);
          received.push(parsedata[i][3]);
          received.push(parsedata[i][4]);
        }
        //console.log(expected);
        //console.log(received);
        //console.table(parsedata);
        let error = calculateMeanAbsoluteError(expected, received);
        //console.log(error);
        document.getElementById('MAE').innerHTML = error;
        return parsedata;
    }

    var parseCsv = new uploadDealcsv();
    parseCsv.getCsv();

    function maeCalculate(){
      let x = 2;
    }