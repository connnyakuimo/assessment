 'use strict';
 const userNameInput = document.getElementById('user-name');
 const assessmentButton = document.getElementById('assessment');
 const resultDivided = document.getElementById('result-area');
 const tweetDivided =document.getElementById('tweet-area');

function removeAllChildren(element) {
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown = event =>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();

    }
};

 assessmentButton.onclick = () => {
     const userName = userNameInput.value;
     if (userName.length === 0) {
         return;
     }

     removeAllChildren(resultDivided);
     const header = document.createElement('h3');
     header.innerText = '診断結果';
     resultDivided.appendChild(header);

     const paragraph = document.createElement('p');
     const result = assessment(userName);
     paragraph.innerText = result;
     resultDivided.appendChild(paragraph);
     

     removeAllChildren(tweetDivided);
     const anchor = document.createElement('a');
     const hrefValue =
     'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('お芋のいいところ') + '&ref_src=twsrc%5Etfw';

     anchor.setAttribute('href',hrefValue);
     anchor.className = 'twitter-hashtag-button';
     anchor.setAttribute('data-text', result);
     anchor.innerText = 'Tweet #お芋のいいところ';
     tweetDivided.appendChild(anchor); 

     const script = document.createElement('script');
     script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
     tweetDivided.appendChild(script);

 };
 const answers = [
    ' {userName}種の良いところは音です。{userName}は特徴的な音が響くため、舌鼓が弾みます。',
    ' {userName}種の良いところは存在感です。{userName}が芋達の中にあれば人は気になって仕方がないでしょう。',
    ' {userName}種のいいところは好奇心です。{userName}はどこいでも根をはれる強さがあります。',
    ' {userName}種のいいところは見た目です。{userName}は ＴＨＥ　ＰＴＥＴＯ な見た目です。',
    ' {userName}種のいいところは豊富な情報です。{userName}を多くの人が研究した結果、皆に栽培されるまで至りました。',
    ' {userName}種のいいところはユニークさです。{userName}は言葉にできない良さを持っています、{userName}はユニークですね',
    ' {userName}種のいいところは用心深さです。{userName}の調理は蒸かす、潰す、薬品と混ぜるの工程をしなければ食べられないほどです。',
    ' {userName}種のいいところは渋さです。{userName}大人な味のため子供はお断りです。',
    ' {userName}種のいいところは決断力です。{userName}が沼地で繁殖する、その大胆な決断は他のではまねできません。',
    ' {userName}種のいいところは熱量です。{userName}の高カロリー具合は他の追随を許しません。',
 ];
 function assessment(userName){
     let sumOfCharCode = 0;
     for (let i = 0; i <userName.length; i ++){
         sumOfCharCode =sumOfCharCode + userName.charCodeAt(i);
     }
     const index = sumOfCharCode % answers.length;
     let result = answers[index];


     return result.replace(/\{userName\}/g,userName);
 }
 console.assert(
     assessment('太郎') ===
     '太郎種のいいところは用心深さです。太郎の調理は蒸かす、潰す、薬品と混ぜるの工程をしなければ食べられないほどです。',
     '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
 );
 console.assert(
     assessment('太郎') === assessment('太郎'),
     'OK'
 );
