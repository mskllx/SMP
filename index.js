function generateRandomNumber(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function createArrayNumber(lengthNumber, valueGeneratorFunction) {
    var arrayNumber = [];
    for (var indexNumber = 0; indexNumber < lengthNumber; indexNumber++) {
        arrayNumber.push(valueGeneratorFunction());
    }
    return arrayNumber;
}

var randomNumbersArray = createArrayNumber(100, function() {
    return generateRandomNumber(1, 100);
});

function sumArrayNumbers(numbersArray) {
    var sumNumber = 0;
    for (var indexNumber = 0; indexNumber < numbersArray.length; indexNumber++) {
        sumNumber += numbersArray[indexNumber];
    }
    return sumNumber;
}

var totalSumNumber = sumArrayNumbers(randomNumbersArray);

console.log("Сума випадкових чисел: " + totalSumNumber);

function bubbleSortArrayNumber(arrNumber) {
    var nNumber = arrNumber.length;
    for (var iNumber = 0; iNumber < nNumber - 1; iNumber++) {
        for (var jNumber = 0; jNumber < nNumber - iNumber - 1; jNumber++) {
            if (arrNumber[jNumber] > arrNumber[jNumber + 1]) {
                var tempNumber = arrNumber[jNumber];
                arrNumber[jNumber] = arrNumber[jNumber + 1];
                arrNumber[jNumber + 1] = tempNumber;
            }
        }
    }
    return arrNumber;
}

var sortedNumbersArray = bubbleSortArrayNumber(randomNumbersArray.slice());

console.log("Відсортовані числа: " + sortedNumbersArray.join(", "));

function factorialNumber(nNumber) {
    if (nNumber === 0 || nNumber === 1) {
        return 1;
    } else {
        return nNumber * factorialNumber(nNumber - 1);
    }
}

var factOfTenNumber = factorialNumber(10);

console.log("Факторіал числа 10: " + factOfTenNumber);

function isPrimeBoolean(numNumber) {
    if (numNumber <= 1) return false;
    if (numNumber <= 3) return true;
    if (numNumber % 2 === 0 || numNumber % 3 === 0) return false;
    for (var iNumber = 5; iNumber * iNumber <= numNumber; iNumber += 6) {
        if (numNumber % iNumber === 0 || numNumber % (iNumber + 2) === 0) return false;
    }
    return true;
}

var primesArray = [];
for (var indexNumber = 2; indexNumber <= 100; indexNumber++) {
    if (isPrimeBoolean(indexNumber)) {
        primesArray.push(indexNumber);
    }
}

console.log("Прості числа від 1 до 100: " + primesArray.join(", "));

function fibonacciArrayNumber(nNumber) {
    var sequenceArrayNumber = [0, 1];
    for (var iNumber = 2; iNumber < nNumber; iNumber++) {
        sequenceArrayNumber[iNumber] = sequenceArrayNumber[iNumber - 1] + sequenceArrayNumber[iNumber - 2];
    }
    return sequenceArrayNumber;
}

var fibSequenceArrayNumber = fibonacciArrayNumber(20);

console.log("Перші 20 чисел Фібоначчі: " + fibSequenceArrayNumber.join(", "));

function reverseStringFunction(strString) {
    return strString.split("").reverse().join("");
}

var originalString = "Привіт, Світ!";
var reversedString = reverseStringFunction(originalString);

console.log("Оригінальний рядок: " + originalString);
console.log("Перевернутий рядок: " + reversedString);

function countVowelsNumber(strString) {
    var countNumber = 0;
    var vowelsString = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    for (var indexNumber = 0; indexNumber < strString.length; indexNumber++) {
        if (vowelsString.indexOf(strString[indexNumber]) !== -1) {
            countNumber++;
        }
    }
    return countNumber;
}

var vowelCountNumber = countVowelsNumber(originalString);

console.log("Кількість голосних у '" + originalString + "': " + vowelCountNumber);

function removeDuplicatesArray(arrArray) {
    var uniqueArray = [];
    for (var indexNumber = 0; indexNumber < arrArray.length; indexNumber++) {
        if (uniqueArray.indexOf(arrArray[indexNumber]) === -1) {
            uniqueArray.push(arrArray[indexNumber]);
        }
    }
    return uniqueArray;
}

var numbersWithDuplicatesArray = [1, 2, 2, 3, 4, 4, 5];
var uniqueNumbersArray = removeDuplicatesArray(numbersWithDuplicatesArray);

console.log("Унікальні числа: " + uniqueNumbersArray.join(", "));

function isPalindromeBoolean(strString) {
    var cleanStrString = strString.replace(/[^A-Za-zА-Яа-я0-9]/g, '').toLowerCase();
    return cleanStrString === cleanStrString.split('').reverse().join('');
}

var palindromeTestString = "Я несу гусеня";
console.log("'" + palindromeTestString + "' є паліндромом: " + isPalindromeBoolean(palindromeTestString));

function getCurrentDateTimeString() {
    var nowDate = new Date();
    return nowDate.toString();
}

console.log("Поточна дата та час: " + getCurrentDateTimeString());

function gcdNumber(aNumber, bNumber) {
    while (bNumber != 0) {
        var tempNumber = bNumber;
        bNumber = aNumber % bNumber;
        aNumber = tempNumber;
    }
    return aNumber;
}

var num1Number = 56;
var num2Number = 98;
var gcdResultNumber = gcdNumber(num1Number, num2Number);

console.log("НСД (" + num1Number + ", " + num2Number + "): " + gcdResultNumber);

function lcmNumber(aNumber, bNumber) {
    return Math.abs(aNumber * bNumber) / gcdNumber(aNumber, bNumber);
}

var lcmResultNumber = lcmNumber(num1Number, num2Number);

console.log("НСК (" + num1Number + ", " + num2Number + "): " + lcmResultNumber);

function generateRandomString(lengthNumber) {
    var charsString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var resultString = '';
    for (var indexNumber = 0; indexNumber < lengthNumber; indexNumber++) {
        resultString += charsString.charAt(generateRandomNumber(0, charsString.length - 1));
    }
    return resultString;
}

var randomStrString = generateRandomString(10);

console.log("Випадковий рядок: " + randomStrString);

var sampleArrayNumber = [1, 2, 3, 4, 5];

var mappedArrayNumber = sampleArrayNumber.map(function(xNumber) {
    return xNumber * 2;
});

console.log("Масив після map: " + mappedArrayNumber.join(", "));

var filteredArrayNumber = sampleArrayNumber.filter(function(xNumber) {
    return xNumber % 2 === 0;
});

console.log("Масив після filter: " + filteredArrayNumber.join(", "));

var reducedValueNumber = sampleArrayNumber.reduce(function(accumulatorNumber, currentValueNumber) {
    return accumulatorNumber + currentValueNumber;
}, 0);

console.log("Значення після reduce: " + reducedValueNumber);

var personObject = {
    firstNameString: "Іван",
    lastNameString: "Петренко",
    ageNumber: 30,
    fullNameFunction: function() {
        return this.firstNameString + " " + this.lastNameString;
    }
};

console.log("Повне ім'я: " + personObject.fullNameFunction());
console.log("Вік: " + personObject.ageNumber);

function RectangleObject(widthNumber, heightNumber) {
    this.widthNumber = widthNumber;
    this.heightNumber = heightNumber;
}

RectangleObject.prototype.areaFunction = function() {
    return this.widthNumber * this.heightNumber;
};

var rectObject = new RectangleObject(10, 5);

console.log("Площа прямокутника: " + rectObject.areaFunction());
