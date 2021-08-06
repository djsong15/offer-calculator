const valuation = document.getElementById('valuation');
const valuationInput = valuation.value;
const valuationOutput = document.getElementById('valuation-value');
const valuationEmoji = document.getElementById('emoji');
const numOptions = document.getElementById('equity');
const salary = document.getElementById('salary');
const inputs = document.querySelectorAll('input');

valuationOutput.textContent = valuationInput.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
valuation.oninput = function() {
    valuationOutput.textContent = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (valuation.value >= 1000000000 && valuation.value <= 1999999999) {
        valuationEmoji.innerHTML =  ' &#128640;';
    } else if (valuation.value >= 2000000000 && valuation.value <= 4999999999) {
        valuationEmoji.innerHTML = " &#128640;&#128640;";
    } else if (valuation.value >= 5000000000 && valuation.value <= 9999999999) {
        valuationEmoji.innerHTML = ' &#128640;&#128640;&#128640;';
    } else if (valuation.value == 10000000000) {
        valuationEmoji.innerHTML = ' &#128640;&#128640;&#128640;&#127773;'
    } else {
        valuationEmoji.textContent = '';
    }
};

inputs.forEach((input) => {
    input.addEventListener('input', createGraph);
});

function createGraph() {
    let percentShare = (parseFloat((numOptions.value).replace(/,/g,'')) / 100000000); //divide by number of outstanding shares
    
    let equityBar = {
        x: ['Input Valuation', '2x', '3x', '5x'],
        y: [(valuation.value*percentShare)/4, 2*(valuation.value*percentShare)/4, 
            3*(valuation.value*percentShare)/4, 5*(valuation.value*percentShare)/4],
        name: 'Annual Equity',
        type: 'bar',
        marker: {
            color: '#1B6CA8'
        },
        hovertemplate: '%{y:$,.2f}'
    };
    
    let salaryBar = {
        x: ['Input Valuation', '2x', '3x', '5x'],
        y: [parseFloat((salary.value).replace(/,/g,'')), parseFloat((salary.value).replace(/,/g,'')), 
        parseFloat((salary.value).replace(/,/g,'')), parseFloat((salary.value).replace(/,/g,''))],
        name: 'Annual Salary',
        type: 'bar',
        marker: {
            color: '#A8571B'
        },
        hovertemplate: '%{y:$,}'
    };
    
    let annualEquityChart = [equityBar, salaryBar];
    let layout = {
        title: 'Total Annual Comp', 
        barmode: 'stack',
        xaxis: {
            title: 'Valuation'
        },
        yaxis: {
            title: 'Total Amount',
            tickformat: '$,',
            rangemode: 'nonnegative',
            automargin: true
        }
    };
    Plotly.newPlot('stacked-bar', annualEquityChart, layout, {responsive: true});
};
createGraph();

$('input').keyup(function(event) {
    if (event.which >= 37 && event.which <= 40) return;
    $(this).val(function(index, value) {
      return value
        // Keep only digits and decimal points:
        .replace(/[^\d.]/g, "")
        // Remove duplicated decimal point, if one exists:
        .replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3')
        // Keep only two digits past the decimal point:
        .replace(/\.(\d{2})\d+/, '.$1')
        // Add thousands separators:
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    });
});