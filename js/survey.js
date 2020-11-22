//variables to store answers
let answerOne,
    answerTwo,
    answerThree;

let answer = answerOne + answerThree + answerTwo;

function pickedWheat(){
    answerOne = ['WH', 'wheat']
    ontoQuestionTwo()
}
function pickedRice(){
    answerOne = ['RI','rice']
    ontoQuestionTwo()
}
function pickedMaize(){
    answerOne = ['MZ', 'maize']
    ontoQuestionTwo()
}

function picked2050(){
    answerTwo = '2050'
    ontoQuestionThree()
}

function picked2080(){
    answerTwo = '2080'
    ontoQuestionThree()
}

function pickedA1 (){
    answerThree = 'A1F1'
    surveyCompleted()
}

function pickedA2 (){
    answerThree = 'A2a'
    surveyCompleted()
}

function pickedB1 (){
    answerThree = 'B1a'
    surveyCompleted()
}

function pickedB2 (){
    answerThree = 'B2a'
    surveyCompleted()
}

function ontoQuestionTwo(){
    $("#surveyQuestion").html('<b> What year to you think will experience a notable change in crop production first?</b>');

    $('#surveyOptions').html('<div class="col">\n' +
        '                            2050 <br>\n' +
        '                            <input type="image" src="img/2050.png" alt="Submit" width="150" height="100" onclick="picked2050()">\n' +
        '                        </div>\n' +
        '                        <div class="col">\n' +
        '                            2080 <br>\n' +
        '                            <input type="image" src="img/2080.png" alt="Submit" width="150" height="100" onclick="picked2080()">\n' +
        '                        </div>\n');
}

function ontoQuestionThree(){
    $("#surveyQuestion").html('<b> Which of the following scenarios do you consider the most likely?</b>');

    $('#surveyOptions').html('<div class="col">\n' +
                                    '<input type="image" src="img/a1.png" alt="Submit" width="170" height="170" onclick="pickedA1()"> <br>\n' +
        '                            A world with very rapid economic growth and introduction of new technologies, ' +
        '                               population peaking mid-century. An emphasis on convergence among ' +
        '                               regions and increased interactions\n' +
        '                        </div>\n' +
        '                        <div class="col">\n' +
                                    '<input type="image" src="img/b1.png" alt="Submit" width="200" height="170" onclick="pickedB1()"> <br>\n' +
        '                            A convergent world with population peaking mid-century where the economy shifts into service and information. ' +
                                    ' a shift towards global solutions for sustainability\n' +
        '                        </div>\n' +
        '                        <div class="col">\n' +
                                    '<input type="image" src="img/a2.png" alt="Submit" width="170" height="170" onclick="pickedA2()"> <br>\n' +
        '                            A heterogeneous world focused on self-reliance and local identities. Continuously increasing population, ' +
                                      'Economic development is region based with fragmented technological advancement<br>\n' +
        '                        </div>\n' +
        '                        <div class="col">\n' +
        '                            <input type="image" src="img/b2.png" alt="Submit" width="200" height="170" onclick="pickedB2()"> <br>\n' +
        '                            A world where the emphasis is on local solutions to economic, social, and environmental sustainability. ' +
                                    ' Continuously increasing population and less rapid technological and economic change <br>\n' +
        '                        </div>\n');
}

function startOver(){
    answerOne, answerTwo, answerThree = '';
    $("#surveyQuestion").html('<b>Which of the following crops would you say plays the biggest role in your diet?</b>');

    $('#surveyOptions').html('<div class="col">\n' +
        '                            Wheat <br>\n' +
        '                            <input type="image" src="img/wheat.png" alt="Submit" width="150" height="150" onclick="pickedWheat()">\n' +
        '                        </div>\n' +
        '                        <div class="col">\n' +
        '                            Maize <br>\n' +
        '                            <input type="image" src="img/maize.png" alt="Submit" width="150" height="150" onclick="pickedMaize()">\n' +
        '                        </div>\n' +
        '                        <div class="col">\n' +
        '                            Rice <br>\n' +
        '                            <input type="image" src="img/rice.png" alt="Submit" width="150" height="150" onclick="pickedRice()">\n' +
        '                        </div>')
}

function surveyCompleted(){
    fullpage_api.moveSectionDown();
}