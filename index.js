function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArray(length, valueGenerator) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr.push(valueGenerator());
    }
    return arr;
}

var randomNumbers = createArray(100, function() {
    return generateRandomNumber(1, 100);
});

function sumArray(numbers) {
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

var total = sumArray(randomNumbers);

console.log("Сума випадкових чисел: " + total);

function bubbleSort(arr) {
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

var sortedNumbers = bubbleSort(randomNumbers.slice());

console.log("Відсортовані числа: " + sortedNumbers.join(", "));

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

var factOfTen = factorial(10);

console.log("Факторіал числа 10: " + factOfTen);

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (var i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

var primes = [];
for (var i = 2; i <= 100; i++) {
    if (isPrime(i)) {
        primes.push(i);
    }
}

console.log("Прості числа від 1 до 100: " + primes.join(", "));

function fibonacci(n) {
    var sequence = [0, 1];
    for (var i = 2; i < n; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
}

var fibSequence = fibonacci(20);

console.log("Перші 20 чисел Фібоначчі: " + fibSequence.join(", "));

function reverseString(str) {
    return str.split("").reverse().join("");
}

var originalString = "Привіт, Світ!";
var reversedString = reverseString(originalString);

console.log("Оригінальний рядок: " + originalString);
console.log("Перевернутий рядок: " + reversedString);

function countVowels(str) {
    var count = 0;
    var vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    for (var i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i]) !== -1) {
            count++;
        }
    }
    return count;
}

var vowelCount = countVowels(originalString);

console.log("Кількість голосних у '" + originalString + "': " + vowelCount);

function removeDuplicates(arr) {
    var uniqueArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (uniqueArr.indexOf(arr[i]) === -1) {
            uniqueArr.push(arr[i]);
        }
    }
    return uniqueArr;
}

var numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
var uniqueNumbers = removeDuplicates(numbersWithDuplicates);

console.log("Унікальні числа: " + uniqueNumbers.join(", "));

function isPalindrome(str) {
    var cleanStr = str.replace(/[^A-Za-zА-Яа-я0-9]/g, '').toLowerCase();
    return cleanStr === cleanStr.split('').reverse().join('');
}

var palindromeTest = "Я несу гусеня";
console.log("'" + palindromeTest + "' є паліндромом: " + isPalindrome(palindromeTest));

function getCurrentDateTime() {
    var now = new Date();
    return now.toString();
}

console.log("Поточна дата та час: " + getCurrentDateTime());

function gcd(a, b) {
    while (b != 0) {
        var temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

var num1 = 56;
var num2 = 98;
var gcdResult = gcd(num1, num2);

console.log("НСД (" + num1 + ", " + num2 + "): " + gcdResult);

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

var lcmResult = lcm(num1, num2);

console.log("НСК (" + num1 + ", " + num2 + "): " + lcmResult);

function generateRandomString(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(generateRandomNumber(0, chars.length - 1));
    }
    return result;
}

var randomStr = generateRandomString(10);

console.log("Випадковий рядок: " + randomStr);

var sampleArray = [1, 2, 3, 4, 5];

var mappedArray = sampleArray.map(function(x) {
    return x * 2;
});

console.log("Масив після map: " + mappedArray.join(", "));

var filteredArray = sampleArray.filter(function(x) {
    return x % 2 === 0;
});

console.log("Масив після filter: " + filteredArray.join(", "));

var reducedValue = sampleArray.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);

console.log("Значення після reduce: " + reducedValue);

var person = {
    firstName: "Іван",
    lastName: "Петренко",
    age: 30,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};

console.log("Повне ім'я: " + person.fullName());
console.log("Вік: " + person.age);

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.area = function() {
    return this.width * this.height;
};

var rect = new Rectangle(10, 5);

console.log("Площа прямокутника: " + rect.area());
