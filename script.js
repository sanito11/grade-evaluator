const SEMESTER = 2, minSubject = 8, maxSub = 9
const excellent = 1.0, good = 1.4, fair = 1.8, poor = 2.2, bad = 2.6;
const inputs = document.getElementsByTagName('input');
const firstAverageDisplay = document.getElementById('firstSem')
const secondAverageDisplay = document.getElementById('secondSem')
const gpa = document.getElementsByTagName('tr')[document.getElementsByTagName('tr').length - 1];


const getFirstInputs = (arr) => {
	let temp = [...arr].filter((item, index) => {
		return index % 2 === 0;
	})
	return temp;
}

const getSecondInputs = (arr) => {
	let temp = [...arr].filter((item, index) => {
		return !(index % 2 === 0);
	})
	return temp;
}

const getRating = (input1, input2) => {
	parseFloat(input1.value) < good ? colorInput(input1, 'excellent') :
		(parseFloat(input1.value) < fair ? colorInput(input1, 'good') :
			(parseFloat(input1.value) < poor ? colorInput(input1, 'fair') :
				(parseFloat(input1.value) < bad ? colorInput(input1, 'poor') :
					(parseFloat(input1.value) >= bad ? colorInput(input1, 'bad') : ''))))

	parseFloat(input2.value) < good ? colorInput(input2, 'excellent') :
		(parseFloat(input2.value) < fair ? colorInput(input2, 'good') :
			(parseFloat(input2.value) < poor ? colorInput(input2, 'fair') :
				(parseFloat(input2.value) < bad ? colorInput(input2, 'poor') :
					(parseFloat(input2.value) >= bad ? colorInput(input2, 'bad') : ''))))
}

const getAverageRating = (average, display) => {
	parseFloat(average) < good ? colorInput(display, 'excellent') :
		(parseFloat(average) < fair ? colorInput(display, 'good') :
			(parseFloat(average) < poor ? colorInput(display, 'fair') :
				(parseFloat(average) < bad ? colorInput(display, 'poor') :
					(parseFloat(average) >= bad ? colorInput(display, 'bad') : ''))))
}

const colorInput = (input, rating) => {
	input.classList.add(rating)
}


const firstSemInputs = getFirstInputs(inputs);
const secondSemInputs = getSecondInputs(inputs);

[...inputs].forEach((item) => item.addEventListener('input', solve))


gpa.innerHTML = `\n\t\t\t<td colspan="2">GPA: INC</td>\n\t\t`;

function solve() {
	let [firstSubjects, secondSubjects] = [9, 9]
	let firstSum = 0, secondSum = 0;

	for (let i = 0; i < maxSub; i++) {

		firstSemInputs[i].setAttribute("class", "")
		secondSemInputs[i].setAttribute("class", "")
		firstAverageDisplay.setAttribute("class", "")
		secondAverageDisplay.setAttribute("class", "")


		if (firstSemInputs[i].value > 3 || firstSemInputs[i].value < 1) {
			firstSemInputs[i].value = firstSemInputs[i].value > 3 ? 3 : (firstSemInputs[i].value != '' ? 1 : '')
		}
		if (secondSemInputs[i].value > 3 || secondSemInputs[i].value < 1) {
			secondSemInputs[i].value = secondSemInputs[i].value > 3 ? 3 : (secondSemInputs[i].value != '' ? 1 : '')
		}

		getRating(firstSemInputs[i], secondSemInputs[i])
		//summing up	
		!isNaN(parseFloat(firstSemInputs[i].value)) ? firstSum += parseFloat(firstSemInputs[i].value) : firstSum += 0;
		!isNaN(parseFloat(secondSemInputs[i].value)) ? secondSum += parseFloat(secondSemInputs[i].value) : secondSum += 0;
		if (firstSemInputs[i].value == '') firstSubjects--;
		if (secondSemInputs[i].value == '') secondSubjects--;
	}
	//dividing
	var firstAverage = 0, secondAverage = 0, incomplete = false, finalAverage = 0;

	if (firstSubjects >= minSubject) {
		firstAverage = firstSum / firstSubjects;
		getAverageRating(firstAverage, firstAverageDisplay)
		firstAverageDisplay.innerText = `Average: ${firstAverage.toFixed(2)}`;

	} else {
		firstAverageDisplay.innerText = 'Average: INC'
		incomplete = true;
		gpa.innerHTML = `\n\t\t\t<td colspan="2">GPA: INC</td>\n\t\t`;
	}

	if (secondSubjects >= minSubject) {
		secondAverage = secondSum / secondSubjects;
		getAverageRating(secondAverage, secondAverageDisplay)
		secondAverageDisplay.innerText = `Average: ${secondAverage.toFixed(2)}`;
	} else {
		secondAverageDisplay.innerText = 'Average: INC'
		incomplete = true;
		gpa.innerHTML = `\n\t\t\t<td colspan="2">GPA: INC</td>\n\t\t`;
	}

	if (!incomplete) {
		finalAverage = (firstAverage + secondAverage) / 2
		gpa.innerHTML = `\n\t\t\t<td colspan="2">GPA: ${finalAverage.toFixed(2)}</td>\n\t\t`;
		getAverageRating(finalAverage, gpa.firstElementChild)
	}

}
