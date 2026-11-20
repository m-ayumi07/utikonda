"use strict";
// 判定はブラウザのJavaScriptだけで完結（AI APIは呼びません）。
const GENRES = {all:"ごちゃまぜ",daily:"日常あるある",work:"お仕事あるある",tech:"IT・パソコン",funny:"珍事件・迷言"};
const DIFFICULTIES = {easy:"梅",normal:"竹",hard:"松"};
const LINES = {
 daily:[
 ["朝の目覚ましが鳴った。","あさのめざましがなった。"],["ご飯のおかわりが止まらない。","ごはんのおかわりがとまらない。"],
 ["洗濯物が風に揺れている。","せんたくものがかぜにゆれている。"],["傘を持つ日に限って晴れる。","かさをもつひにかぎってはれる。"],
 ["休日の二度寝は最高だ。","きゅうじつのにどねはさいこうだ。"],["冷蔵庫にプリンがない。","れいぞうこにぷりんがない。"],
 ["靴下の片方が消えた。","くつしたのかたほうがきえた。"],["明日の自分に期待しよう。","あしたのじぶんにきたいしよう。"],
 ["買い物メモを家に忘れた。","かいものめもをいえにわすれた。"],["今日こそ早く寝るぞ。","きょうこそはやくねるぞ。"],
 ["猫がキーボードに乗った。","ねこがきーぼーどにのった。"],["信号が全部赤だった。","しんごうがぜんぶあかだった。"]],
 work:[
 ["会議が予定より長引いた。","かいぎがよていよりながびいた。"],["資料の名前を間違えた。","しりょうのなまえをまちがえた。"],
 ["上司の返事が早すぎる。","じょうしのへんじがはやすぎる。"],["今日のタスクを片づける。","きょうのたすくをかたづける。"],
 ["メールの宛先を確認する。","めーるのあてさきをかくにんする。"],["定時退社は夢じゃない。","ていじたいしゃはゆめじゃない。"],
 ["報告書を忘れずに出す。","ほうこくしょをわすれずにだす。"],["休憩時間が一瞬で終わる。","きゅうけいじかんがいっしゅんでおわる。"],
 ["机の上を整理しよう。","つくえのうえをせいりしよう。"],["誤字に気づいて助かった。","ごじにきづいてたすかった。"],
 ["議事録は早めにまとめる。","ぎじろくははやめにまとめる。"],["朝礼で声が裏返った。","ちょうれいでこえがうらがえった。"]],
 tech:[
 ["パソコンを再起動した。","ぱそこんをさいきどうした。"],["ログを見て原因を探す。","ろぐをみてげんいんをさがす。"],
 ["エラーの文字を読み直す。","えらーのもじをよみなおす。"],["新しいコードを書こう。","あたらしいこーどをかこう。"],
 ["テストを一つずつ実行。","てすとをひとつずつじっこう。"],["保存ボタンを押し忘れた。","ほぞんぼたんをおしわすれた。"],
 ["変数の名前に悩んでいる。","へんすうのなまえになやんでいる。"],["ネットが急に切れていた。","ねっとがきゅうにきれていた。"],
 ["画面が固まってしまった。","がめんがかたまってしまった。"],["バグを見つけて報告した。","ばぐをみつけてほうこくした。"],
 ["関数の動きを確認する。","かんすうのうごきをかくにんする。"],["タイピングの練習中だ。","たいぴんぐのれんしゅうちゅうだ。"]],
 funny:[
 ["うちの猫は部長らしい。","うちのねこはぶちょうらしい。"],["カレーが私を呼んでいる。","かれーがわたしをよんでいる。"],
 ["右手が先に退勤した。","みぎてがさきにたいきんした。"],["冷蔵庫が会議を始めた。","れいぞうこがかいぎをはじめた。"],
 ["伝説の消しゴムを探せ。","でんせつのけしごむをさがせ。"],["バナナが社長に就任した。","ばなながしゃちょうにしゅうにんした。"],
 ["寝坊にも美学がある。","ねぼうにもびがくがある。"],["今日の運勢は大盛りだ。","きょうのうんせいはおおもりだ。"],
 ["靴ひもが反抗期に入る。","くつひもがはんこうきにはいる。"],["たこ焼きが空を飛んだ。","たこやきがそらをとんだ。"],
 ["気合いだけなら世界一だ。","きあいだけならせかいいちだ。"],["プリンに名前を書こう。","ぷりんになまえをかこう。"]]
};
const ROMAJI={
 あ:'a',い:'i',う:'u',え:'e',お:'o',か:'ka',き:'ki',く:'ku',け:'ke',こ:'ko',さ:'sa',し:'shi',す:'su',せ:'se',そ:'so',た:'ta',ち:'chi',つ:'tsu',て:'te',と:'to',な:'na',に:'ni',ぬ:'nu',ね:'ne',の:'no',は:'ha',ひ:'hi',ふ:'fu',へ:'he',ほ:'ho',ま:'ma',み:'mi',む:'mu',め:'me',も:'mo',や:'ya',ゆ:'yu',よ:'yo',ら:'ra',り:'ri',る:'ru',れ:'re',ろ:'ro',わ:'wa',を:'wo',ん:'n',
 が:'ga',ぎ:'gi',ぐ:'gu',げ:'ge',ご:'go',ざ:'za',じ:'ji',ず:'zu',ぜ:'ze',ぞ:'zo',だ:'da',ぢ:'ji',づ:'zu',で:'de',ど:'do',ば:'ba',び:'bi',ぶ:'bu',べ:'be',ぼ:'bo',ぱ:'pa',ぴ:'pi',ぷ:'pu',ぺ:'pe',ぽ:'po',
 きゃ:'kya',きゅ:'kyu',きょ:'kyo',しゃ:'sha',しゅ:'shu',しょ:'sho',ちゃ:'cha',ちゅ:'chu',ちょ:'cho',にゃ:'nya',にゅ:'nyu',にょ:'nyo',ひゃ:'hya',ひゅ:'hyu',ひょ:'hyo',みゃ:'mya',みゅ:'myu',みょ:'myo',りゃ:'rya',りゅ:'ryu',りょ:'ryo',ぎゃ:'gya',ぎゅ:'gyu',ぎょ:'gyo',じゃ:'ja',じゅ:'ju',じょ:'jo',びゃ:'bya',びゅ:'byu',びょ:'byo',ぴゃ:'pya',ぴゅ:'pyu',ぴょ:'pyo',
 '。':'.','、':',','！':'!','？':'?','ー':'-',' ':' '
};
function romanize(kana){let out='';for(let i=0;i<kana.length;i++){
 const c=kana[i], next=kana[i+1]||'';
 if(c==='っ'){const pair=ROMAJI[kana.slice(i+1,i+3)]||ROMAJI[next];if(!pair)throw Error('小さい「っ」の後の文字が不明');out+=pair.startsWith('ch')?'t':pair[0];continue;}
 if(c==='ん'){const after=ROMAJI[kana.slice(i+1,i+3)]||ROMAJI[next]||'';out+=/^[aiueoy]/.test(after)?"n'":'n';continue;}
 const pair=ROMAJI[kana.slice(i,i+2)];if(pair){out+=pair;i++;continue;}
 const one=ROMAJI[c];if(!one)throw Error('ローマ字化できない文字: '+c);out+=one;
 }return out;}

// 同じ日本語に対応する一般的なローマ字の打ち方を許可する。
// 例：「し」は shi / si のどちらでも正解。「ち」「つ」「ふ」なども同様。
const ROMAJI_ALIASES={
 'し':['shi','si'],'ち':['chi','ti'],'つ':['tsu','tu'],'ふ':['fu','hu'],
 'じ':['ji','zi'],'ぢ':['di','ji'],'づ':['du','zu'],'を':['wo','o'],
 'しゃ':['sha','sya'],'しゅ':['shu','syu'],'しょ':['sho','syo'],
 'ちゃ':['cha','tya','cya'],'ちゅ':['chu','tyu','cyu'],'ちょ':['cho','tyo','cyo'],
 'じゃ':['ja','zya','jya'],'じゅ':['ju','zyu','jyu'],'じょ':['jo','zyo','jyo'],
 'ぢゃ':['dya'],'ぢゅ':['dyu'],'ぢょ':['dyo']
};
function romanTokens(kana){
 const result=[];
 for(let i=0;i<kana.length;i++){
  const c=kana[i],next=kana[i+1]||'';
  if(c==='っ'){
   const syllable=kana.slice(i+1,i+3) in ROMAJI? kana.slice(i+1,i+3):next;
   const options=ROMAJI_ALIASES[syllable]||[ROMAJI[syllable]];
   if(!options[0])throw Error('小さい「っ」の後の文字が不明');
   // 小さい「っ」は次の子音を重ねる。chは t / c のどちらでも使える。
   const consonants=[...new Set(options.map(x=>x[0]).concat(options.some(x=>x.startsWith('ch'))?['t']:[]))];
   result.push({variants:consonants,chosen:consonants[0]});continue;
  }
  if(c==='ん'){
   const after=ROMAJI[kana.slice(i+1,i+3)]||ROMAJI[next]||'';
   const variants=/^[aiueoy]/.test(after)?["n'",'nn'] : ['n'];
   result.push({variants,chosen:variants[0]});continue;
  }
  const pair=ROMAJI[kana.slice(i,i+2)];
  const unit=pair?kana.slice(i,i+2):c;
  if(pair)i++;
  const canonical=ROMAJI[unit];
  if(!canonical)throw Error('ローマ字化できない文字: '+unit);
  const variants=[...new Set([canonical,...(ROMAJI_ALIASES[unit]||[])])];
  result.push({variants,chosen:variants[0]});
 }
 return result;
}
function rebuildRoman(q){q.romaji=q.tokens.map(x=>x.chosen).join('');}

const STORAGE_KEY="uchikonda-v3-romaji-ten-questions";
const IDENTITY_KEY="uchikonda-player-identity-v1";
const OWN_NAMES_KEY="uchikonda-owned-names-v2";
function normalizedName(name){return String(name).normalize("NFKC").trim().toLocaleLowerCase("ja-JP");}
function loadIdentity(){try{const x=JSON.parse(localStorage.getItem(IDENTITY_KEY)||'null');return x&&typeof x.name==='string'&&typeof x.id==='string'?x:null;}catch{return null;}}
function loadOwnedNames(){
 const names=new Map();
 try{const saved=JSON.parse(localStorage.getItem(OWN_NAMES_KEY)||'[]');if(Array.isArray(saved))for(const x of saved){if(x&&typeof x.name==='string'&&typeof x.id==='string')names.set(normalizedName(x.name),x);}}catch{}
 // 以前のバージョンで一度登録した名前も、本人の名前として引き継ぐ。
 const old=loadIdentity();if(old&&!names.has(normalizedName(old.name)))names.set(normalizedName(old.name),old);
 return names;
}
const ownedNames=loadOwnedNames();
function saveOwnedNames(){try{localStorage.setItem(OWN_NAMES_KEY,JSON.stringify([...ownedNames.values()]));}catch{}}
function createIdentity(name){
 const id=(typeof crypto!=="undefined"&&crypto.randomUUID)?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;
 const newIdentity={id,name};ownedNames.set(normalizedName(name),newIdentity);
 saveOwnedNames();try{localStorage.setItem(IDENTITY_KEY,JSON.stringify(newIdentity));}catch{}
 return newIdentity;
}
let identity=loadIdentity();
function selectIdentity(entry){identity=entry;try{localStorage.setItem(IDENTITY_KEY,JSON.stringify(entry));}catch{}}
// KPM=正しく入力したキー数÷所要分数。正確率を二乗してミスを反映した得点を番付に使用。
function scoreFor(correct,errors,ms){const kpm=correct/(ms/60000),accuracy=correct/(correct+errors);return {kpm:Math.round(kpm),accuracy:Math.round(accuracy*100),score:Math.round(kpm*accuracy*accuracy)};}
function scoreOrder(a,b){return (b.score||0)-(a.score||0)||(b.accuracy||0)-(a.accuracy||0)||a.ms-b.ms||a.errors-b.errors||a.date-b.date;}

const $=id=>document.getElementById(id);
const state={name:"",difficulty:"easy",genre:"all",questions:[],index:0,position:0,tokenIndex:0,tokenPrefix:"",startTime:null,elapsed:0,raf:null,errors:0,combo:0,maxCombo:0,correctKeys:0,finished:false};
function show(id){for(const s of ["startScreen","gameScreen","resultScreen"])$(s).hidden=s!==id;window.scrollTo(0,0);}
function pickDifficulty(){return document.querySelector('input[name="difficulty"]:checked').value;}
function formatTime(ms){let cs=Math.floor(ms/10),s=Math.floor(cs/100);return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}.${String(cs%100).padStart(2,"0")}`;}
function randShuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function makeQuestions(genre,difficulty){
 const all=(genre==='all'?Object.values(LINES).flat():LINES[genre]);
 return randShuffle(all.map(([text,kana])=>{
  const prefix={text,kana};
  if(difficulty==='easy')return prefix;
  if(difficulty==='normal')return {text:text+' まだまだこれからだ。',kana:kana+' まだまだこれからだ。'};
  return {text:text+' 焦らず正確に打ち込もう。最後まで油断するな。',kana:kana+' あせらずせいかくにうちこもう。さいごまでゆだんするな。'};
 })).slice(0,10).map(q=>{const tokens=romanTokens(q.kana);return {...q,tokens,romaji:tokens.map(x=>x.chosen).join('')};});
}
function readRecords(){try{const a=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");return Array.isArray(a)?a.filter(x=>x&&DIFFICULTIES[x.difficulty]&&GENRES[x.genre]&&typeof x.name==="string"&&Number.isFinite(x.ms)&&Number.isFinite(x.date)):[];}catch{return [];}}
function saveRecords(a){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(a.slice(0,150)));return true;}catch{return false;}}
// 名前が番付にある場合は本人確認。自称だけでは所有者を証明できないので、このブラウザでの確認となる。
function isNameTaken(name){const key=normalizedName(name);return readRecords().some(r=>normalizedName(r.name)===key);}
const ANCESTOR_LINES=[
 'お、お待ちくださいませ！ そのお名前……まさか伝説の先代さまでございますか!?',
 'その名を口にした瞬間、師匠の入れ歯が震えました。もしや先代さま……!?',
 '家系図が勝手に開きました！ あなた様は、あの先代さまでございますか!?',
 '番付がざわついております！ このお名前、先代さまのお名前と完全一致ですぞ！'
];
const ANCESTOR_DENIAL_LINES=[
 'なんじゃ別人かい！ 先代さまの名を堂々と名乗るとは……ワシの寿命が3秒縮んだぞ。改名じゃ！',
 '紛らわしいのぉ〜！ 先代さまの名前で入場するとは、授業参観に校長のフリで来るようなものじゃ！',
 '影武者ではなかったか！ 先代さまが押し入れから「著作権！」と叫んでおる。別名にせい！',
 '別人じゃと!? 先代さまの名札を返してきなさい！ そして新しい名前を授かるのじゃ！'
];
let lastAncestorLine=-1;
let pendingAncestorName='';
let ancestorStage='question';
let confirmedAncestorName='';
function showAncestorModal(name){
 const modal=$('ancestorModal');
 pendingAncestorName=name;ancestorStage='question';
 let i=Math.floor(Math.random()*ANCESTOR_LINES.length);
 if(ANCESTOR_LINES.length>1&&i===lastAncestorLine)i=(i+1)%ANCESTOR_LINES.length;
 lastAncestorLine=i;
 $('ancestorTakenName').textContent=name;
 $('ancestorHeading').textContent='先代、降臨。';
 $('ancestorMessage').textContent=ANCESTOR_LINES[i];
 $('ancestorQuestion').textContent='あなた様は……もしや、先代さまでございますか？';
 $('ancestorYes').hidden=false;$('ancestorNo').hidden=false;$('ancestorClose').hidden=true;
 modal.hidden=false;document.body.classList.add('ancestor-open');$('ancestorYes').focus();
}
function closeAncestorModal(){
 const modal=$('ancestorModal');if(modal.hidden)return;
 modal.hidden=true;document.body.classList.remove('ancestor-open');
 $('playerName').focus();
}
function claimAncestor(){
 // 本人だと申告した場合は同名再挑戦を許可し、開始画面に戻す。
 confirmedAncestorName=normalizedName(pendingAncestorName);
 const existing=ownedNames.get(confirmedAncestorName);
 if(existing)selectIdentity(existing);
 $('nameRule').textContent='先代さま、お帰りなさいませ！ もう一度「いざ、打ち込ん打！」で出陣できますぞ。';
 closeAncestorModal();
}
function denyAncestor(){
 ancestorStage='denied';confirmedAncestorName='';
 const i=Math.floor(Math.random()*ANCESTOR_DENIAL_LINES.length);
 $('ancestorHeading').textContent='まさかの別人！';
 $('ancestorQuestion').textContent='おぬしの真の名を授け直すのじゃ！';
 $('ancestorMessage').textContent=ANCESTOR_DENIAL_LINES[i];
 $('ancestorYes').hidden=true;$('ancestorNo').hidden=true;$('ancestorClose').hidden=false;
 $('ancestorClose').focus();
}
function renameAfterDenial(){
 $('playerName').value='';closeAncestorModal();
 $('nameRule').textContent='先代の名前は使用できません。新しい名を打ち込むのじゃ！';
 $('playerName').focus();
}
function showStartError(message){$("startError").textContent=message;$("startError").hidden=false;$("playerName").setAttribute("aria-invalid","true");}
function clearStartError(){$("startError").hidden=true;$("playerName").removeAttribute("aria-invalid");}
function rankList(difficulty,genre){return readRecords().filter(x=>x.difficulty===difficulty&&x.genre===genre&&Number.isFinite(x.score)&&Number.isFinite(x.kpm)).sort(scoreOrder);}
function bestByPlayer(records){const map=new Map();for(const r of records.sort(scoreOrder)){const key=normalizedName(r.name);if(!map.has(key))map.set(key,r);}return [...map.values()].sort(scoreOrder);}

function renderRanking(id,difficulty,genre){const list=$(id);list.replaceChildren();const records=bestByPlayer(rankList(difficulty,genre)).slice(0,5);if(!records.length){const li=document.createElement("li");li.className="empty";li.textContent="番付は空っぽ。初代王者は君だ！";list.append(li);return;}
 records.forEach((r,i)=>{const li=document.createElement("li");const n=document.createElement("span"),name=document.createElement("span"),time=document.createElement("span");n.className="rank-num";n.textContent=["金","銀","銅"][i]||String(i+1);name.textContent=r.name;time.textContent=`${r.score||0}点 / ${r.kpm||0}KPM / 喝${r.errors}`;li.append(n,name,time);list.append(li);});}
function updateRanking(){const d=pickDifficulty(),g=$("genreSelect").value;$("rankDifficulty").textContent=`${DIFFICULTIES[d]} · ${GENRES[g]}部門`;renderRanking("startLeaderboard",d,g);}
function stopClock(){if(state.raf!==null)cancelAnimationFrame(state.raf);state.raf=null;}
function tick(){if(state.startTime===null||state.finished)return;state.elapsed=performance.now()-state.startTime;$("timer").textContent=formatTime(state.elapsed);state.raf=requestAnimationFrame(tick);}
function totalCharacters(){return state.questions.reduce((sum,q)=>sum+q.romaji.length,0);}
function paintQuestion(){
 const q=state.questions[state.index],frag=document.createDocumentFragment();
 for(let i=0;i<q.romaji.length;i++){
  const n=document.createElement('span');n.textContent=q.romaji[i];n.className=i<state.position?'hit':i===state.position?'cursor':'remaining';frag.append(n);
 }
 $('romajiText').replaceChildren(frag);
 const complete=state.questions.slice(0,state.index).reduce((sum,q)=>sum+q.romaji.length,0);
 const current=complete+state.position,total=totalCharacters();
 $('progressValue').textContent=`${Math.floor(current/total*100)}%`;
 $('progressBar').style.width=`${current/total*100}%`;
 $('counter').textContent=`${state.position} / ${q.romaji.length} キー`;
 $('typingInput').value=q.romaji.slice(0,state.position);
}
function showQuestion(){
 const num=state.index+1,q=state.questions[state.index];state.position=0;state.tokenIndex=0;state.tokenPrefix="";
 $('questionNumber').textContent=`第 ${num} / 10 問`;
 $('targetText').textContent=q.text;
 $('gameSubtitle').textContent=num===1?'最初の一打で時計が動くぞ！':`${num-1}問突破！ 次もいくぞ！`;
 paintQuestion();$('typingInput').focus();
}
function startGame(){const name=$('playerName').value.trim();
 if(!name){showStartError('名前がない！ まずは名乗るのだ！');$('playerName').focus();return;}
 if(isNameTaken(name)&&confirmedAncestorName!==normalizedName(name)){clearStartError();showAncestorModal(name);return;}
 confirmedAncestorName='';
 // 初登録なら名前を授かる。過去にこの端末で授かった名はそのまま再挑戦できる。
 const existing=ownedNames.get(normalizedName(name));
 if(existing){selectIdentity(existing);}else{identity=createIdentity(name);}
 $('nameRule').textContent='名前を授かったぞ！ 同じ名前で再挑戦も、別名での新規挑戦もできる！';
 clearStartError();stopClock();clearTimeout(katsuTimeout);
 Object.assign(state,{name,difficulty:pickDifficulty(),genre:$('genreSelect').value,index:0,position:0,tokenIndex:0,tokenPrefix:"",startTime:null,elapsed:0,errors:0,combo:0,maxCombo:0,correctKeys:0,finished:false});
 state.questions=makeQuestions(state.genre,state.difficulty);
 $('comboBurst').classList.remove('combo-pop');$('comboBurst').textContent='';
 $('katsuPop').classList.remove('popping','milestone');
 $('timer').textContent='00:00.00';$('errorValue').textContent='0';$('comboValue').textContent='0';$('comboShout').textContent='一打ずつ積み重ねよ！';$('gameDifficulty').textContent=`${DIFFICULTIES[state.difficulty]}｜${GENRES[state.genre]}`;
 $('typingInput').disabled=false;show('gameScreen');showQuestion();
}
let katsuTimeout;
function katsu(){const pop=$('katsuPop'),phrases=['小指が泣いておる！','キーボードと和解せよ！','焦るでない！','今のは見ておったぞ！','落ち着いて打つのじゃ！'];
 const special={5:'5喝！ 師匠の眉毛が飛び上がった！',10:'10喝！ キーボードに謝罪会見じゃ！',20:'20喝！ 師匠の血圧が急上昇！',30:'30喝！ 寺の鐘より鳴っておる！'};
 $('katsuPhrase').textContent=special[state.errors]||phrases[(state.errors-1)%phrases.length];
 pop.classList.toggle('milestone',!!special[state.errors]);pop.classList.remove('popping');void pop.offsetWidth;pop.classList.add('popping');
 clearTimeout(katsuTimeout);katsuTimeout=setTimeout(()=>pop.classList.remove('popping'),650);
}
function recordKey(char){
 if(state.finished)return;
 if(state.startTime===null){state.startTime=performance.now();tick();}
 const q=state.questions[state.index],token=q.tokens[state.tokenIndex];
 if(!token)return;
 const prefix=state.tokenPrefix+char;
 const matching=token.variants.filter(v=>v.startsWith(prefix));
 if(matching.length){
  state.correctKeys++;state.combo++;state.maxCombo=Math.max(state.maxCombo,state.combo);
  $('comboValue').textContent=String(state.combo);
  if([10,25,50,100].includes(state.combo)){$('comboShout').textContent=`${state.combo}連打！ 師匠の手が拍手で筋肉痛じゃ！`;const c=$('comboBurst');c.textContent=`${state.combo} COMBO!`;c.classList.remove('combo-pop');void c.offsetWidth;c.classList.add('combo-pop');}
  state.tokenPrefix=prefix;
  const full=matching.find(v=>v===prefix);
  token.chosen=full||matching[0];
  if(full){state.tokenIndex++;state.tokenPrefix='';}
  rebuildRoman(q);
  state.position=q.tokens.slice(0,state.tokenIndex).reduce((sum,t)=>sum+t.chosen.length,0)+state.tokenPrefix.length;
  paintQuestion();
  if(state.tokenIndex===q.tokens.length){
   if(state.index===9)finishGame();else{state.index++;showQuestion();}
  }
 }else{state.errors++;state.combo=0;$('comboValue').textContent='0';$('comboShout').textContent='ドンマイ！ コンボを積み直せ！';$('errorValue').textContent=String(state.errors);katsu();}
}
// Macの日本語IMEが有効でも、物理キー e.code からアルファベットを取得する。
// 入力欄の変換確定は不要。Backspace・Deleteは喝の対象外。
function printableKey(e){
 if(e.ctrlKey||e.metaKey||e.altKey)return null;
 if(e.key&&/^[a-z]$/i.test(e.key))return e.key.toLowerCase();
 if(/^Key[A-Z]$/.test(e.code))return e.code.slice(3).toLowerCase();
 if(e.key&&/^[0-9]$/.test(e.key))return e.key;
 if(/^Digit[0-9]$/.test(e.code))return e.code.slice(5);
 if(e.key===' '||e.code==='Space')return ' ';
 if(e.key==='.'||e.key===','||e.key==='!'||e.key==='?'||e.key==='-'||e.key==="'")return e.key;
 if(e.code==='Period')return '.';
 if(e.code==='Comma')return ',';
 if(e.code==='Minus')return '-';
 if(e.code==='Quote')return "'";
 return null;
}
function onTypingKeydown(e){
 if(state.finished)return;
 if(e.key==='Backspace'||e.key==='Delete'){e.preventDefault();return;}
 if(e.ctrlKey||e.metaKey||e.altKey)return;
 const key=printableKey(e);
 if(key===null)return;
 e.preventDefault();if(e.repeat)return;
 recordKey(key);
}
// スマホのソフトキーボード等、keydownにキー文字がない端末向けの補助。
// ローマ字で一文字ずつ確定した場合のみ受理する。
function onInput(e){
 if(state.finished||e.isComposing)return;
 const current=$('typingInput').value,valid=state.questions[state.index].romaji.slice(0,state.position);
 const added=current.slice(valid.length);
 $('typingInput').value=valid;
 if(added.length===1&&/^[a-z0-9 .,!?'\-]$/i.test(added))recordKey(added.toLowerCase());
}
function titleFor(errors){if(errors===0)return "称号：指先に宿る神";if(errors<=3)return "称号：ほぼ無傷の打鍵侍";if(errors<=10)return "称号：ちょい喝の達人";if(errors<=25)return "称号：喝を浴びても進む者";return "称号：喝まみれの不死鳥";}
function scold(errors){if(errors===0)return "喝なし！ 師匠も言葉を失った。";if(errors<=5)return `喝！ × ${errors}発。まだまだ余裕じゃ！`;if(errors<=15)return `喝！ × ${errors}発。指に説教しておこう。`;return `喝！ × ${errors}発。師匠がのど飴を要求している。`;}
// 称号・喝コメントとは別に、結果に応じたランダムなひと言を出す。
const FUNNY_COMMENTS={
 perfect:[
  'おぬし、キーボードと前世で結婚しておったな？',
  '喝ゼロとは何事じゃ。師匠の出番がないではないか！',
  '指先に住民票を移した方がよいのでは？',
  'これはもう人間ではない。指である。'
 ],
 few:[
  'その数回の喝、たぶんキーボードの気まぐれじゃ。たぶん。',
  '惜しい！ その指、たまに寄り道しておるぞ。',
  'ミスは少ない。師匠のツッコミも省エネじゃ。',
  'おお、いい感じ！ ただし調子には乗るなよ。'
 ],
 some:[
  'なかなかよいぞ。ところで指は何本使っておる？',
  'キーボードもびっくりの暴れっぷりじゃな。',
  '喝を浴びても止まらぬ。そこだけは評価しよう。',
  '指が先走っておる！ 心を置いていくでない。'
 ],
 many:[
  '喝の大安売りじゃ！ 本日限り、返品不可！',
  'キーボードに謝罪会見を開く準備はできたか？',
  'その打鍵、まるで祭りの太鼓じゃな。',
  '師匠の「喝！」が先に疲れてしまったぞ。'
 ],
 storm:[
  '喝が多すぎて、師匠の喉が臨時休業じゃ。',
  'これはタイピング対決か、キーボードとの口論か？',
  '伝説の「喝」製造機、ここに爆誕。',
  '完走しただけで立派じゃ。次は指と作戦会議じゃな。'
 ]
};
function funnyCommentFor(errors){
 const tier=errors===0?'perfect':errors<=3?'few':errors<=10?'some':errors<=25?'many':'storm';
 const choices=FUNNY_COMMENTS[tier];
 return choices[Math.floor(Math.random()*choices.length)];
}
function finishGame(){
 if(state.finished)return;
 state.elapsed=performance.now()-state.startTime;state.finished=true;stopClock();$('typingInput').disabled=true;
 const ms=Math.max(10,Math.round(state.elapsed)),date=Date.now();
 const metrics=scoreFor(state.correctKeys,state.errors,ms);
 const record={name:state.name,playerId:identity?.id||null,difficulty:state.difficulty,genre:state.genre,ms,errors:state.errors,...metrics,correctKeys:state.correctKeys,maxCombo:state.maxCombo,date};
 const existing=readRecords(),records=[...existing,record];
 const saved=saveRecords(records);
 const board=bestByPlayer(records.filter(x=>x.genre===record.genre&&x.difficulty===record.difficulty));
 const rank=board.findIndex(x=>normalizedName(x.name)===normalizedName(record.name))+1;
 $('resultName').textContent=state.name;$('resultDifficulty').textContent=`${DIFFICULTIES[state.difficulty]}・${GENRES[state.genre]}`;
 $('resultTime').textContent=formatTime(ms);$('resultAccuracy').textContent=`${metrics.accuracy}%`;
 $('resultErrors').textContent=`喝！ × ${state.errors}`;$('resultRank').textContent=`${rank}位`;
 $('resultScore').textContent=`${metrics.score}点`;$('resultKpm').textContent=`${metrics.kpm} KPM`;$('resultCombo').textContent=`${state.maxCombo} COMBO`;
 $('resultTitle').textContent=titleFor(state.errors);$('katsuComment').textContent=scold(state.errors);$('funnyComment').textContent=funnyCommentFor(state.errors);
 $('resultMessage').textContent=saved?'10問完走！ 自己ベストなら番付を更新したぞ。':'10問完走！ 記録を保存できませんでした。';
 renderRanking('resultLeaderboard',state.difficulty,state.genre);show('resultScreen');
}
function goHome(){stopClock();state.finished=true;$("playerName").value=state.name||$("playerName").value;clearStartError();updateRanking();show("startScreen");}
function retry(){document.querySelector(`input[name="difficulty"][value="${state.difficulty}"]`).checked=true;$("genreSelect").value=state.genre;
 $("playerName").value=state.name;startGame();}
function init(){
 $('startButton').addEventListener('click',startGame);
 $('ancestorClose').addEventListener('click',renameAfterDenial);
 $('ancestorYes').addEventListener('click',claimAncestor);
 $('ancestorNo').addEventListener('click',denyAncestor);
 $('ancestorModal').addEventListener('click',e=>{if(e.target===$('ancestorModal')&&ancestorStage==='denied')renameAfterDenial();});
 document.addEventListener('keydown',e=>{
   if($('ancestorModal').hidden)return;
   if(e.key==='Escape'){e.preventDefault();if(ancestorStage==='denied')renameAfterDenial();return;}
   if(e.key==='Tab'){e.preventDefault();const btns=ancestorStage==='question'?[$('ancestorYes'),$('ancestorNo')]:[$('ancestorClose')];const ix=btns.indexOf(document.activeElement);btns[(ix+(e.shiftKey?-1:1)+btns.length)%btns.length].focus();}
 });
 $('playerName').addEventListener('input',()=>{clearStartError();confirmedAncestorName='';});
 if(identity){$('playerName').value=identity.name;$('nameRule').textContent='前回の名前を表示中。別の名前も入力できるぞ！';} $('playerName').readOnly=false;$('playerName').removeAttribute('readonly');
 $('playerName').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();startGame();}});
 document.querySelectorAll('input[name="difficulty"]').forEach(el=>el.addEventListener('change',updateRanking));
 $('genreSelect').addEventListener('change',updateRanking);
 $('typingInput').addEventListener('keydown',onTypingKeydown);
 $('typingInput').addEventListener('input',onInput);
 $('typingInput').addEventListener('compositionend',()=>{if(!state.finished)paintQuestion();});
 for(const ev of ['paste','drop'])$('typingInput').addEventListener(ev,e=>e.preventDefault());
 $('restartButton').addEventListener('click',retry);$('quitButton').addEventListener('click',goHome);
 $('retryButton').addEventListener('click',retry);$('backButton').addEventListener('click',goHome);
 updateRanking();
}
init();
