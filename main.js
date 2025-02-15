let shablon = ``;
let id_main_interval;
let EnteredText = "";
let changed = true;
let selected_text = "";
let id = [null];
let ind_ = 0;
let Interval = {
  input_come: 600,
  input_go: 600,
  setting_come: 600,
  setting_go: 600
}
let innerText = "";
let pre_LP = 0;
let lines = [];
let add_list_position = -100;
let Setting_ = {
  theme: "dark",
  font_size: 22,
  font_style: "roboto",
  lang: "english"
};
let TextValue = {
  input: "",
  reader: ""
};
let LANGUAGE = {
  from: "en",
  to: "uz"
};
let ListOfWords = [];
let counts_ = 0;
let main_p_ = "";

let info = "AKROYIT=>30-01-2025=V-3.1";
let readss = false;
let curentP = 1; 

let novel = {
  chaps: 10,
  curentC: 1,
  name: "shadow_slave",
  path: "all_novels/shadow_slave"
}

let NovelsContext = "";

const chap_sel = document.getElementById("chap-sel");
const AddList = document.getElementById("add_list");
const ReadList = document.getElementById("read_list");
const SettingList = document.getElementById("setting_list");


if (localStorage.getItem("NovelsData") !== null ) {
  novel = JSON.parse(localStorage.getItem("NovelsData"));
  console.log("ss")
}

//console.log(info);

if (localStorage.getItem("List_Of_Words") !== null) {
  (JSON.parse(localStorage.getItem("List_Of_Words"))).forEach(element => {
    ListOfWords.push(element);
  });
}

//if (localStorage.getItem)

if ((localStorage.getItem("Settings_data")) !== null) {
  Setting_ = {
    theme: JSON.parse(localStorage.getItem("Settings_data")).theme,
    font_size: JSON.parse(localStorage.getItem("Settings_data")).font_size,
    font_style: JSON.parse(localStorage.getItem("Settings_data")).font_style,
    lang: JSON.parse(localStorage.getItem("Settings_data")).lang
  };
}

if (localStorage.getItem("Text_Value_data") !== null) {
  if (JSON.parse(localStorage.getItem("Text_Value_data")).reader === "") {
    //NewList();
  } else {
    TextValue = {
      input: JSON.parse(localStorage.getItem("Text_Value_data")).input,
      reader: JSON.parse(localStorage.getItem("Text_Value_data")).reader
    }
    //TextAllPage(TextValue.reader);  
    MainInterval(true);
  }
}

chap_sel.innerHTML = ``;
for (let i = 1; i <= novel.chaps; i++) {
  chap_sel.innerHTML += `<option value="${i}">Chap-${i}</option>`;
}


document.documentElement.setAttribute('page-theme',"dark");
document.documentElement.setAttribute('text-size',"22");

FontSizeChange(Setting_.font_size);
FontStyleChange(Setting_.font_style);
PageThemeChange(Setting_.theme);
SettingLangChange(Setting_.lang);







function  SetSetingToLS() {
  (localStorage.setItem("Settings_data", JSON.stringify({
    theme: Setting_.theme,
    font_size: Setting_.font_size,
    font_style: Setting_.font_style,
    lang: Setting_.lang
  })))
}

function SetTextValueToLC() {
  localStorage.setItem("Text_Value_data", JSON.stringify({
    input: TextValue.input,
    reader: TextValue.reader
  }))
}

function SetWordToList(new_word_, uz_new_word_) {
  ListOfWords.push({
    from: new_word_,
    to: uz_new_word_
  });
  localStorage.setItem("List_Of_Words", JSON.stringify(ListOfWords));
}


function FontSizeChange(font_size_) {
  document.getElementById(`font_size_${Setting_.font_size}`).classList.remove("selected_setting");
  document.getElementById(`font_size_${font_size_}`).classList.add("selected_setting");  
  document.documentElement.setAttribute('text-size', `${font_size_}`);
  Setting_.font_size = font_size_;
  SetSetingToLS();
}

function FontStyleChange(font_style_) {
  document.getElementById(`font_style_${Setting_.font_style}`).classList.remove("selected_setting");
  document.getElementById(`font_style_${font_style_}`).classList.add("selected_setting");  
  document.documentElement.setAttribute('text-style', `${font_style_}`);
  Setting_.font_style = font_style_;
  SetSetingToLS();
}

function PageThemeChange(page_theme_) {
  document.getElementById(`theme_${Setting_.theme}`).classList.remove("selected_setting");
  document.getElementById(`theme_${page_theme_}`).classList.add("selected_setting");  
  document.documentElement.setAttribute('page-theme', `${page_theme_}`);
  Setting_.theme = page_theme_;
  SetSetingToLS();
}

function SettingLangChange(lang_change_) {
  document.getElementById(`lang_${Setting_.lang}`).classList.remove("selected_setting");
  document.getElementById(`lang_${lang_change_}`).classList.add("selected_setting");  
  Setting_.lang = lang_change_;
  if (lang_change_ === "english") {
    LANGUAGE.from = "en";
  } else if (lang_change_ === "korean") {
    LANGUAGE.from = "ko";
  } else if (lang_change_ === "russian") {
    LANGUAGE.from = "ru";
  }
  SetSetingToLS();
}

//document.getElementById("input_text").value = shablon;
function FixText() {
  pre_LP = 0;
  lines = [];
  innerText = document.getElementById("input_text").value;

  for (let i = 0; i < innerText.length; i++) {
    if (innerText.substr(i, 1) === "\n" || i === innerText.length-1) {
      lines.push(innerText.substr(pre_LP, (i - pre_LP)))
      pre_LP = i+1;
    }
  }
}

function TextAllPage(reader_text_) {
  //FixText();
 // ReadList.innerHTML = "";
  //lines.forEach(element => {
  //  ReadList.innerHTML += `<p>${element}</p>`;
  //});

  counts_ = 1;
  main_p_ = `<div class="title_of_the_novel" id="title_of_the_novel">
      NAME 
    </div>
    <p class='main_p' id=main_p_id_${counts_} onclick="CertainP(${counts_});">`;
  
  for (let i = 0; i < reader_text_.length; i++) {
    if (reader_text_.substr(i, 1) === "\n" && reader_text_.substr(i+2, 1) !== "\n") {
      counts_++;
      main_p_ += `</p> <p class='main_p' id=main_p_id_${counts_} onclick="CertainP(${counts_});">`;
    } else {
      main_p_ += reader_text_.substr(i, 1);
    }
  }
  main_p_ += `</p>`
  document.getElementById("text_p").innerHTML = main_p_;
  document.getElementById("title_of_the_novel").innerHTML = novel.name;

   document.getElementById("scroll_list").scrollTop = 0;
  TextValue.reader = reader_text_;
  SetTextValueToLC();
}

function FuncForStr(Echar) {
  answ_ = "";
  if (Echar === "\n") {
    answ_ = "<br>"
 // } else if (Echar === " ") {
  //  answ_ = "&nbsp;"
  } else if (Echar === "  ") {
    answ_ = "&emsp;"
  } else {
    answ_ = Echar;
  }
  return answ_;
}

function SettingsS() {
  setting_list_position = 200;
  id_set_go_list = setInterval(() => {
    setting_list_position -= 5;
    if (setting_list_position <= 50) {
      setting_list_position = 50;
      SettingList.style = `left: 50%;`;
      //StartClicked();
      clearInterval(id_set_go_list);
    } else {
      SettingList.style = `left: ${setting_list_position}%;`;
    }
  }, (Interval.setting_come / 30) );
}

function SettingClose() {
  setting_list_position = 50;
  id_set_back_list = setInterval(() => {
    setting_list_position += 5;
    if (setting_list_position >= 200) {
      setting_list_position = 200;
      SettingList.style = `left: 200%;`;
      //StartClicked();
      clearInterval(id_set_back_list);
    } else {
      SettingList.style = `left: ${setting_list_position}%;`;
    }
  }, (Interval.setting_come / 30) );
}

function NewList() {
  document.getElementById("input_text").value = "";
  MainInterval(false);
  add_list_position = -100;
  id_add_list = setInterval(() => {
    add_list_position += 5;
    if (add_list_position >= 50) {
      add_list_position = 50;
      AddList.style = `left: 50%;`;
      //StartClicked();
      clearInterval(id_add_list);
    } else {
      AddList.style = `left: ${add_list_position}%;`;
    }
  }, (Interval.input_come / 30) );
}

function StartClicked(param) {
  //if (document.getElementById("input_text").value.length < 10) {
  //}
  add_list_position = 50;
  id_start_list = setInterval(() => {
    add_list_position -= 5;
    if (add_list_position <= -100) {
      if (param === "new") {
        EnteredText = document.getElementById("input_text").value;
      } else {
        EnteredText = document.getElementById("text_p").innerHTML;
        EnteredText += " ";
        EnteredText += document.getElementById("input_text").value;
      }
      MainInterval(true);
     // TextAllPage(EnteredText);
      AddList.style = `left: -100%;`;
      clearInterval(id_start_list);
    } else {
      AddList.style = `left: ${add_list_position}%;`;
    }
  }, (Interval.input_go / 30));
}



function MainInterval(bool_) {
  if (bool_ === true) {
    id_main_interval = setInterval(() => {
      if (changed) {
        if (selected_text !== window.getSelection().toString() && 
            window.getSelection().toString() !== " " &&
            window.getSelection().toString() !== "" &&
            window.getSelection().toString().length < 500)  {
          selected_text = window.getSelection().toString();
          ind_++;
          localStorage.setItem(`answer_fi_${ind_}`, "false");
          TranslateText(ind_, LANGUAGE.from, LANGUAGE.to, selected_text);
          f1(ind_);
        }
      }
    }, 100);
  } else if (bool_ === false) {
    clearInterval(id_main_interval);
  }
}

function f1(num_) {
  id.push();
  id[num_] = setInterval(() => {
    if ( localStorage.getItem(`answer_fi_${num_}`) === "true" ) {
      data_text_ = localStorage.getItem(`answer_tr_${num_}`);
      // Don`t need that now !
      //SetWordToList(selected_text, data_text_);
      if (data_text_.length < 25) { // err
        //document.getElementById("translate_panel").innerHTML = data_text_;
      } else {
        // pop up list ??? !!!
        //alert(data_text_);
      }
      document.getElementById("foregin").innerHTML = selected_text;

      localStorage.removeItem(`answer_tr_${num_}`);
      localStorage.removeItem(`answer_fi_${num_}`);
      clearInterval(id[num_]);
    }
  }, 100);
}

function Akroyit() {
  const channelLink = `https://t.me/AkbarShoh_711`;
  // Open the channel link in a new tab/window
  window.open(channelLink, '_blank');
}

function AkroyitChanel() {
  const channelLink = `https://t.me/akroyit`;
  // Open the channel link in a new tab/window
  window.open(channelLink, '_blank');
}

function ResetData() {
  if (window.confirm('Do you want clear all data?'))
    {
        // They clicked Yes
        localStorage.removeItem("Settings_data");
        localStorage.removeItem("Text_Value_data");
        localStorage.removeItem("List_Of_Words");
        location.reload();
    }
    else
    {
        // They clicked no
    }
}


async function TextToSpeech(text_, lang_) {
  if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance object
      var utterance = new SpeechSynthesisUtterance();
      // Set the text to be spoken
      utterance.text = text_;
      // Specify Korean as the language
      if (lang_ === "kr") {
      utterance.lang = 'ko-KR';
      } else if (lang_ === "uz") {
      utterance.lang = 'uz-UZ'; // Set language to Uzbek
      } else if (lang_ === "en") {
      utterance.lang = 'en-US'; // Set language to English
      } else if (lang_ === "ru") {
      utterance.lang = 'ru-RU'; // Set language to Russian
      }
      // Speak the text
      speechSynthesis.speak(utterance);
      //
      utterance.onend = function() {
        console.log("done"); // "done" will be logged when speech ends
      };
  } else {
      // If speech synthesis is not supported, alert the user
      alert('Sorry, your browser does not support speech synthesis.');
  }
}

function SoundT() {
  if (LANGUAGE.from === "en") {
    langg = "en";
  } else if (LANGUAGE.from === "ko") {
    langg = "kr";
  } else if (LANGUAGE.from === "ru") {
    langg = "ru";
  }
  TextToSpeech(selected_text, langg)
}

window.resizeTo(750,750)



function CertainP(i) {
  curentP = i;
  scrollToElementById(`main_p_id_${i-1}`);
  for (let j = 1; j <= counts_; j++) {
    document.getElementById(`main_p_id_${j}`).style = `background-color: var(--body-bg-color);`;
  }
    document.getElementById(`main_p_id_${i}`).style = `background-color: gray;`;
    if (LANGUAGE.from === "en") {
      langg = "en";
    } else if (LANGUAGE.from === "ko") {
      langg = "kr";
    } else if (LANGUAGE.from === "ru") {
      langg = "ru";
    }
    if (readss) {
      TextToSpeechZ(document.getElementById(`main_p_id_${i}`).innerHTML, langg, i+1)
    }
    //console.log(document.getElementById(`main_p_id_${i}`).innerHTML)
}


async function TextToSpeechZ(text_, lang_, next) {
  if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance object
      var utterance = new SpeechSynthesisUtterance();
      // Set the text to be spoken
      utterance.text = text_;
      // Specify Korean as the language
      if (lang_ === "kr") {
      utterance.lang = 'ko-KR';
      } else if (lang_ === "uz") {
      utterance.lang = 'uz-UZ'; // Set language to Uzbek
      } else if (lang_ === "en") {
      utterance.lang = 'en-US'; // Set language to English
      } else if (lang_ === "ru") {
      utterance.lang = 'ru-RU'; // Set language to Russian
      }
      utterance.rate = 0.9;
      // Speak the text
      speechSynthesis.speak(utterance);
      //
      utterance.onend = function() {
        console.log("done"); // "done" will be logged when speech ends
        setTimeout(() => {
          if (next <= counts_) {
            CertainP(next)    
          }      
        }, 100);
      };
  } else {
      // If speech synthesis is not supported, alert the user
      alert('Sorry, your browser does not support speech synthesis.');
  }
}


function scrollToElementById(id) {
  var element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',  // Smooth scrolling
      block: 'start'       // Elementni ekranning yuqori qismiga joylashtirish
    });
  } else {
    console.log('Element not found');
  }
}


function ReadSS() {
  readss = !readss;
  if (readss) {
    CertainP(curentP);
    document.getElementById("readss_btn").innerHTML = "STOP";
  } else {
    speechSynthesis.cancel();
    document.getElementById("readss_btn").innerHTML = "START";
  }
}

function ChapterChange(chap_) {
  if (chap_ > 0 && chap_ <= novel.chaps) {
    console.log(chap_);
    novel.curentC = chap_;
    document.getElementById("chap-sel").value = chap_;
    Start();
  }
}







function GetDataForChap(path_) {
  answer = "?";
  // Faylni serverdan o'qish uchun fetch yordamida
  fetch(path_)  // Fayl manzili
  .then(response => {
      if (!response.ok) {
          throw new Error('Faylni yuklab bo\'lmadi');
      }
      return response.text();  // Faylni matn sifatida o'qish
  })
  .then(data => {
      var context = data;  // O'qilgan faylning tarkibi
      answer = context;
      NovelsContext = data;
  })
  .catch(error => {
      console.error('Xatolik:', error);
  });
  return answer;
}

        
Start();

function Start() {
  GetDataForChap(`${novel.path}/chap_${novel.curentC}.txt`)

  setTimeout(() => {
    //console.log("dsa", NovelsContext)    
    TextAllPage(NovelsContext);  
  }, 200);
}





function GoToHome() {
  window.location.href = "index.html";
}