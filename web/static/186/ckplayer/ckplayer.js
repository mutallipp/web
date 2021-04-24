/*
-------------------------------------------------------------------------
  璇存槑:
  姝ｅ紡浣跨敤鏃跺彲浠ユ妸璇ユ枃浠剁殑娉ㄩ噴鍏ㄩ儴鍘绘帀锛岃妭鐪佸姞杞芥椂闂�
  ckplayer6.8,鏈夐棶棰樿璁块棶http://www.ckplayer.com
  璇锋敞鎰忥紝璇ユ枃浠朵负UTF-8缂栫爜锛屼笉闇€瑕佹敼鍙樼紪鐮佸嵆鍙娇鐢ㄤ簬鍚勭缂栫爜褰㈠紡鐨勭綉绔欏唴
-------------------------------------------------------------------------
绗竴閮ㄥ垎锛屽姞杞芥彃浠�
浠ヤ笅涓哄姞杞界殑鎻掍欢閮ㄤ唤
鎻掍欢鐨勮缃弬鏁拌鏄庯細
	1銆佹彃浠跺悕绉�
	2銆佹按骞冲榻愭柟寮忥紙0宸︼紝1涓紝2鍙筹級
	3銆佸瀭鐩村榻愭柟寮忥紙0涓婏紝1涓紝2涓嬶級
	4銆佹按骞虫柟鍚戜綅缃亸绉婚噺
	5銆佸瀭鐩存柟鍚戜綅缃亸绉婚噺
	6銆佹彃浠剁殑绛夌骇锛�0=鏅€氬浘鐗囨彃浠朵笖璺熼殢鎺у埗鏍忛殣钘忚€岄殣钘忥紝鏄剧ず鑰屾樉绀猴紝1=鏅€氬浘鐗囨彃浠朵笖姘镐箙鏄剧ず锛�2=swf鎻掍欢锛岄粯璁ゆ樉绀猴紝3=swf鎻掍欢锛岄粯璁ら殣钘忥紝swf鎻掍欢閮藉彲浠ヤ氦浜�
	7銆佹彃浠舵槸鍚︾粦瀹氬湪鎺у埗鏍忎笂锛�0涓嶇粦瀹氾紝1缁戝畾锛屽綋鍊兼槸1鐨勬椂鍊欒鎻掍欢灏嗕細闅忕潃鎺у埗鏍忎竴璧烽殣钘忔垨缂撳姩
	8銆佹彃浠朵负swf骞朵笖鍙氦浜掓椂锛岄粯璁よ皟鐢ㄧ殑绫绘墍鍦ㄧ殑鍖呭悕绉帮紝璇︾粏璇存槑鍙互鍒板府鍔╂墜鍐岄噷鏌ョ湅锛岄粯璁ゆ棤
	鎻掍欢鍚嶇О涓嶈兘鐩稿悓锛屽姝ょ殑璇︾粏璇存槑璇峰埌缃戠珯鏌ョ湅
*/
function ckcpt() {
    var cpt = '';
    return cpt;
}
/*
鎻掍欢鐨勫畾涔夌粨鏉�
浠ヤ笅鏄鎾斁鍣ㄥ姛鑳借繘琛岄厤缃�
*/
function ckstyle() { //瀹氫箟鎬荤殑椋庢牸
    var ck = {
        cpath: '',
        /*
		鎾斁鍣ㄩ鏍煎帇缂╁寘鏂囦欢鐨勮矾寰勶紝榛樿鐨勬槸style.swf
		濡傛灉璋冪敤涓嶅嚭鏉ュ彲浠ヨ瘯鐫€璁剧疆鎴愮粷瀵硅矾寰勮瘯璇�
		濡傛灉涓嶇煡閬撹矾寰勫苟涓斾娇鐢ㄧ殑鏄粯璁ら厤缃紝鍙互鐩存帴鐣欑┖锛屾挱鏀惧櫒浼�
		*/
        language: '',
        /*鎾斁鍣ㄦ墍浣跨敤鐨勮瑷€閰嶇疆鏂囦欢锛岄渶瑕佸拰鎾斁鍣ㄥ湪鍚岀洰褰曚笅锛岄粯璁ゆ槸language.xml*/
        flashvars: '',
        /*
		杩欓噷鏄敤鏉ュ仛涓哄flashvars鍊肩殑琛ュ厖锛岄櫎浜哻鍜寈浜屼釜鍙傛暟浠ュ鐨勮缃兘鍙互鍦ㄨ繖閲岃繘琛岄厤缃�
		                          1 1 1 1   1 1 1 1 1 1 2 2 2  2 2 2 2 2    2 2 3 3 3 3 3 3 3 3 3   3 4  4 4 4
       			1 2 3 4 5 6 7 8 9 0 1 2 3   4 5 6 7 8 9 0 1 2  3 4 5 6 7    8 9 0 1 2 3 4 5 6 7 8   9 0  1 2 3*/
        setup: '1,1,1,1,1,2,0,1,2,0,0,1,200,0,2,1,0,1,1,1,1,10,3,0,1,2,3000,0,0,0,0,1,1,1,1,1,1,250,0,90,0,0,0',
        /*
		杩欐槸閰嶇疆鏂囦欢閲屾瘮杈冮噸瑕佺殑涓€涓弬鏁帮紝鍏辨湁N涓姛鑳芥帶鍒跺弬鏁帮紝骞朵笖浠ュ悗浼氱户缁殑澧炲姞锛屽悇鎺у埗鍙傛暟浠ヨ嫳鏂囬€楀彿(,)闅斿紑銆備笅闈㈠垪鍑哄悇鍙傛暟鐨勮鏄庯細
			1銆侀紶鏍囩粡杩囨寜閽槸鍚︿娇鐢ㄦ墜鍨嬶紝0鏅€氶紶鏍囷紝1鎵嬪瀷榧犳爣锛�2鏄彧鏈夋寜閽墜鍨嬶紝3鏄帶鍒舵爮鎵嬪瀷
			2銆佹槸鍚︽敮鎸佸崟鍑绘殏鍋滐紝0涓嶆敮鎸侊紝1鏄敮鎸�
			3銆佹槸鍚︽敮鎸佸弻鍑诲叏灞忥紝0涓嶆敮鎸侊紝1鏄敮鎸�
			4銆佸湪鎾斁鍓嶇疆骞垮憡鏃舵槸鍚﹀悓鏃跺姞杞借棰戯紝0涓嶅姞杞斤紝1鍔犺浇
			5銆佸箍鍛婃樉绀虹殑鍙傝€冨璞★紝0鏄弬鑰冭棰戝尯鍩燂紝1鏄弬鑰冩挱鏀惧櫒鍖哄煙
			6銆佸箍鍛婂ぇ灏忕殑璋冩暣鏂瑰紡,鍙拡瀵箂wf鍜屽浘鐗囨湁鏁�,瑙嗛鏄嚜鍔ㄧ缉鏀剧殑
				0=鑷姩璋冩暣澶у皬锛屾剰鎬濇槸璇村ぇ鐨勮瘽灏卞彉灏忥紝灏忕殑璇濆氨鍙樺ぇ
				1=鏄ぇ鐨勫寲鍙樺皬锛屽皬鐨勮瘽涓嶅彉
				2=鏄粈涔堜篃涓嶅彉锛屽氨杩欎箞澶�
				3=鏄窡鍙傝€冨鍍�(绗�5涓帶鍒�)鍙傛暟璁剧疆鐨勪竴鏍峰楂�
			7銆佸墠缃箍鍛婃挱鏀鹃『搴忥紝0鏄『搴忔挱鏀撅紝1鏄殢鏈烘挱鏀撅紝>1鍒欓殢鏈哄彇鎵€鏈夊箍鍛婁腑鐨�(N-1)涓繘琛屾挱鏀�
			8銆佸浜庤棰戝箍鍛婃槸鍚﹂噰鐢ㄤ慨姝ｏ紝0鏄笉浣跨敤锛�1鏄娇鐢紝濡傛灉鏄�1锛屽垯鐢ㄦ埛鍦ㄧ綉閫熸參鐨勬儏鍐典笅浼氭寜璁惧畾鐨勫€掕鏃惰繘琛屾挱鏀惧箍鍛婏紝璁℃椂缁撴潫鍒欐斁姝ｇ墖锛堟瘮杈冧汉鎬у寲锛夛紝璁剧疆鎴�0鐨勮瘽锛屽垯寮哄埗鎾斁瀹屽箍鍛婃墠鑳芥挱鏀炬鐗�
			9銆佹槸鍚﹀紑鍚粴鍔ㄦ枃瀛楀箍鍛婏紝0鏄笉寮€鍚紝1鏄紑鍚笖涓嶄娇鐢ㄥ叧闂寜閽紝2鏄紑鍚苟涓斾娇鐢ㄥ叧闂寜閽紝寮€鍚悗灏嗗湪鍔犺浇瑙嗛鐨勬椂鍊欏姞杞芥粴鍔ㄦ枃瀛楀箍鍛�
			10銆佽棰戠殑璋冩暣鏂瑰紡
				0=鏄嚜鍔ㄨ皟鏁村ぇ灏忥紝鎰忔€濇槸璇村ぇ鐨勮瘽灏卞彉灏忥紝灏忕殑璇濆氨鍙樺ぇ锛屽悓鏃朵繚鎸侀暱瀹芥瘮渚嬩笉鍙�
				1=鏄ぇ鐨勫寲鍙樺皬锛屽皬鐨勮瘽涓嶅彉
				2=鏄粈涔堜篃涓嶅彉锛屽氨杩欎箞澶�
				3=鏄窡鍙傝€冨鍍�(pm_video鐨勮缃�)鍙傛暟璁剧疆鐨勪竴鏍峰楂�
			11銆佹槸鍚﹀湪澶氳棰戞椂鍒嗘鍔犺浇锛�0涓嶆槸锛�1鏄�
			12銆佺缉鏀捐棰戞椂鏄惁杩涜骞虫粦澶勭悊锛�0涓嶆槸锛�1鏄�
			13銆佽棰戠紦鍐叉椂闂�,鍗曚綅锛氭绉�,寤鸿涓嶈秴杩�300
			14銆佸垵濮嬪浘鐗囪皟鏁存柟寮�(
				0=鏄嚜鍔ㄨ皟鏁村ぇ灏忥紝鎰忔€濇槸璇村ぇ鐨勮瘽灏卞彉灏忥紝灏忕殑璇濆氨鍙樺ぇ锛屽悓鏃朵繚鎸侀暱瀹芥瘮渚嬩笉鍙�
				1=鏄ぇ鐨勫寲鍙樺皬锛屽皬鐨勮瘽涓嶅彉
				2=鏄粈涔堜篃涓嶅彉锛屽氨杩欎箞澶�
				3=鏄窡pm_video鍙傛暟璁剧疆鐨勪竴鏍峰楂�
			15銆佹殏鍋滃箍鍛婅皟鏁存柟寮�(
				0=鏄嚜鍔ㄨ皟鏁村ぇ灏忥紝鎰忔€濇槸璇村ぇ鐨勮瘽灏卞彉灏忥紝灏忕殑璇濆氨鍙樺ぇ锛屽悓鏃朵繚鎸侀暱瀹芥瘮渚嬩笉鍙�
				1=鏄ぇ鐨勫寲鍙樺皬锛屽皬鐨勮瘽涓嶅彉
				2=鏄粈涔堜篃涓嶅彉锛屽氨杩欎箞澶�
				3=鏄窡pm_video鍙傛暟璁剧疆鐨勪竴鏍峰
			16銆佹殏鍋滃箍鍛婃槸鍚︿娇鐢ㄥ叧闂箍鍛婅缃紝0涓嶄娇鐢紝1浣跨敤
			17銆佺紦鍐叉椂鏄惁鎾斁骞垮憡锛�0鏄笉鏄剧ず锛�1鏄樉绀哄苟鍚屾椂闅愯棌鎺夌紦鍐插浘鏍囧拰杩涘害锛�2鏄樉绀哄苟涓嶉殣钘忕紦鍐插浘鏍�
			18銆佹槸鍚︽敮鎸侀敭鐩樼┖鏍奸敭鎺у埗鎾斁鍜屾殏鍋�0涓嶆敮鎸侊紝1鏀寔
			19銆佹槸鍚︽敮鎸侀敭鐩樺乏鍙虫柟鍚戦敭鎺у埗蹇繘蹇€€0涓嶆敮鎸侊紝1鏀寔
			20銆佹槸鍚︽敮鎸侀敭鐩樹笂涓嬫柟鍚戦敭鎺у埗闊抽噺0涓嶆敮鎸侊紝1鏀寔
			21銆佹挱鏀惧櫒杩斿洖js鍏ㄩ儴鐩戝惉鍑芥暟鐨勭瓑绾э紝0-2,绛夌骇瓒婇珮锛岃繑鍥炵殑鍙傛暟瓒婂
				0=涓嶈繑鍥炲叏閮ㄧ洃鍚簨浠�
				1=杩斿洖鐩戝惉锛屼絾涓嶅湪鎺у埗鍙拌緭鍑�
				2=杩斿洖鐩戝惉锛屽苟涓斿湪鎺у埗鍙板悓姝ヨ緭鍑�
				3=杩斿洖鍏ㄩ儴鐩戝惉浜嬩欢锛屽苟涓斿湪鍙傛暟鍓嶅姞涓�"鎾斁鍣↖D->"锛岀敤浜庡鎾斁鍣ㄧ殑鐩戝惉
			22銆佸揩杩涘拰蹇€€鐨勭鏁�
			23銆佺晫闈笂鍥剧墖鍏冪礌鍔犺浇澶辫触閲嶆柊鍔犺浇娆℃暟
			24銆佸紑鍚姞杞界毊鑲ゅ帇缂╂枃浠跺寘鐨勫姞杞借繘搴︽彁绀�
			25銆佷娇鐢ㄩ殣钘忔帶鍒舵爮鏃舵樉绀虹畝鍗曡繘搴︽潯鐨勫姛鑳�,0鏄笉浣跨敤锛�1鏄娇鐢紝2鏄彧鍦ㄦ櫘閫氱姸鎬佷笅浣跨敤
			26銆佹帶鍒舵爮闅愯棌璁剧疆(0涓嶉殣钘忥紝1鍏ㄥ睆鏃堕殣钘忥紝2閮介殣钘�
			27銆佹帶鍒舵爮闅愯棌寤舵椂鏃堕棿锛屽嵆鍦ㄩ紶鏍囩寮€鎺у埗鏍忓悗澶氬皯姣鍚庨殣钘忔帶鍒舵爮
			28銆佹粴鍔ㄦ枃瀛楀箍鍛婂乏鍙虫粴鍔ㄦ椂鏄惁閲囩敤鏃犵紳锛岄粯璁�0閲囩敤锛�1鏄笉閲囩敤
			29銆�0鏄甯哥姸鎬侊紝1鏄帶鍒舵爮榛樿闅愯棌锛屾挱鏀剧姸鎬佷笅榧犳爣缁忚繃鎾斁鍣ㄦ樉绀烘帶鍒舵爮锛�2鏄竴鐩撮殣钘忔帶鍒舵爮
			30銆佸湪鎾斁rtmp瑙嗛鏃舵殏鍋滃悗鐐瑰嚮鎾斁鏄惁閲囩敤閲嶆柊閾炬帴鐨勬柟寮�,杩欓噷涓€鍏卞垎0-2涓変釜绛夌骇
			31銆佸綋閲囩敤缃戝潃褰㈠紡(flashvars閲宻=1/2鏃�)璇诲彇瑙嗛鍦板潃鏃舵槸閲囩敤榛樿0=get鏂规硶锛�1=post鏂瑰紡
			32銆佹槸鍚﹀惎鐢ㄦ挱鏀炬寜閽拰鏆傚仠鎸夐挳
			33銆佹槸鍚﹀惎鐢ㄤ腑闂存殏鍋滄寜閽�
			34銆佹槸鍚﹀惎鐢ㄩ潤闊虫寜閽�
			35銆佹槸鍚﹀惎鐢ㄥ叏灞忔寜閽�
			36銆佹槸鍚﹀惎鐢ㄨ繘搴﹁皟鑺傛爮,0涓嶅惎鐢紝1鏄惎鐢紝2鏄彧鑳藉墠杩涳紙鍚戝彸鎷栧姩锛夛紝3鏄彧鑳藉悗閫€锛�4鏄彧鑳藉墠杩涗絾鑳藉洖鍒扮涓€娆℃嫋鍔ㄦ椂鐨勪綅缃紝5鏄湅杩囩殑鍦版柟鍙互闅忔剰鎷栧姩锛�
			37銆佹槸鍚﹀惎鐢ㄨ皟鑺傞煶閲�
			38銆佽绠楁椂闂寸殑闂撮殧锛屾绉�
			39銆佸墠缃甽ogo鑷冲皯鏄剧ず鐨勬椂闂达紝鍗曚綅锛氭绉�
			40銆佸墠缃棰戝箍鍛婄殑榛樿闊抽噺
			41銆佸綋s=3/4鏃跺姞杞芥彃浠舵槸鍚︿粠鍘嬬缉鍖呴噷鍔犺浇锛�0涓嶆槸锛�1鏄�
			42銆佸姞杞介鏍兼槸鍚﹂噰鐢ㄥ姞瀵嗘柟寮忎紶閫侊紝璇ュ姛鑳芥櫘閫氱敤鎴蜂笉鑳戒娇鐢�
			43銆佸湪s=1/2鏃讹紝璋冪敤鍦板潃閲岀殑鍦板潃鏄惁鏄浉瀵瑰湴鍧€锛堢浉瀵逛簬璋冪敤鏂囦欢锛夛紝0涓嶆槸锛�1鏄�
		*/
        pm_bg: '0x000000,100,230,180',
        /*鎾斁鍣ㄦ暣浣撶殑鑳屾櫙閰嶇疆锛岃娉ㄦ剰锛岃繖閲屽彧鏄竴涓垵濮嬪寲鐨勮缃紝濡傛灉闇€瑕佺湡姝ｇ殑鏀瑰姩鎾斁鍣ㄧ殑鑳屾櫙鍜屾渶灏忓楂橈紝闇€瑕佸湪椋庢牸鏂囦欢閲屾壘鍒扮浉鍚岀殑鍙傛暟杩涜鏇存敼銆�
		1銆佹暣浣撹儗鏅鑹�
		2銆佽儗鏅€忔槑搴�
		3銆佹挱鏀惧櫒鏈€灏忓搴�
		4銆佹挱鏀惧櫒鏈€灏忛珮搴�
		杩欓噷鍙槸鍒濆鍖栨椂鐨勮缃紝鏈€缁堝姞杞藉畬鎾斁鍣ㄥ悗鏄剧ず鐨勬晥鏋滈渶瑕佸湪style.swf/style.xml閲岃缃鍙傛暟
		*/
        mylogo: 'logo.swf',
        /*
		瑙嗛鍔犺浇鍓嶆樉绀虹殑logo鏂囦欢锛屼笉浣跨敤璁剧疆鎴恘ull锛屽嵆mylogo='null';
		*/
        pm_mylogo: '1,1,-470,-370',
        /*
		瑙嗛鍔犺浇鍓嶆樉绀虹殑logo鏂囦欢(mylogo鍙傛暟鐨�)鐨勪綅缃�
		鏈蒋浠舵墍鏈夌殑鍥涗釜鍙傛暟鎺у埗浣嶇疆鐨勬柟寮忓叏閮ㄩ兘鏄粺涓€鐨勬剰鎬濓紝濡備笅
		1銆佹按骞冲榻愭柟寮忥紝0鏄乏锛�1鏄腑锛�2鏄彸
		2銆佸瀭鐩村榻愭柟寮忥紝0鏄笂锛�1鏄腑锛�2鏄笅
		3銆佹按骞冲亸绉婚噺锛屼妇渚嬭鏄庯紝濡傛灉绗�1涓弬鏁拌缃垚0宸﹀榻愶紝绗�3涓亸绉婚噺璁剧疆鎴�10锛屽氨鏄宸﹁竟10涓儚绱狅紝绗竴涓弬鏁拌缃垚2锛屽亸绉婚噺濡傛灉璁剧疆鐨勬槸姝ｅ€煎氨浼氱Щ鍒版挱鏀惧櫒澶栭潰锛屽彧鏈夎缃垚璐熷€兼墠琛岋紝璁剧疆鎴�-1锛屾寜閽氨浼氳窇鍒版挱鏀惧櫒澶栭潰
		4銆佸瀭鐩村亸绉婚噺
		*/
        logo: 'cklogo.png',
        /*
		榛樿鍙充笂瑙掍竴鐩存樉绀虹殑logo锛屼笉浣跨敤璁剧疆鎴恘ull锛屽嵆logo='null';
		*/
        pm_logo: '2,0,-220,20',
        /*
		鎾斁鍣ㄥ彸涓婅鐨刲ogo鐨勪綅缃�
			1銆佹按骞冲榻愭柟寮忥紝0鏄乏锛�1鏄腑锛�2鏄彸
			2銆佸瀭鐩村榻愭柟寮忥紝0鏄笂锛�1鏄腑锛�2鏄笅
			3銆佹按骞冲亸绉婚噺
			4銆佸瀭鐩村亸绉婚噺
		浠ヤ笅鏄挱鏀惧櫒鑷甫鐨勪簩涓彃浠�
		*/
        control_rel: 'related.swf,ckplayer/related.xml,0',
        /*
		瑙嗛缁撴潫鏄剧ず绮惧僵瑙嗛鐨勬彃浠�
			1銆佽棰戞挱鏀剧粨鏉熷悗鏄剧ず鐩稿叧绮惧僵瑙嗛鐨勬彃浠舵枃浠讹紙娉ㄦ剰锛岃棰戠粨鏉熷姩浣滆缃垚3鏃�(鍗硋ar flashvars={e:3})鏈夋晥锛夛紝
			2銆亁ml鏂囦欢鏄皟鐢ㄧ簿褰╄棰戠殑绀轰緥鏂囦欢锛屽彲浠ヨ嚜瀹氫箟鏂囦欢绫诲瀷锛堟瘮濡俛sp,php,jsp,.net鍙杈撳嚭鐨勬槸xml鏍煎紡灏辫锛�,瀹為檯浣跨敤涓竴瀹氳娉ㄦ剰绗簩涓弬鏁扮殑璺緞瑕佹纭�
			3銆佺涓変釜鍙傛暟鏄缃厤缃枃浠剁殑缂栫爜锛�0鏄粯璁ょ殑utf-8,1鏄痝bk2312
		*/
        control_pv: 'Preview.swf,105,2000',
        /*
		瑙嗛棰勮鎻掍欢
			1銆佹彃浠舵枃浠跺悕绉�(璇ユ彃浠跺拰涓婇潰鐨勭簿褰╄棰戠殑鎻掍欢閮芥槸鏀惧湪椋庢牸鍘嬬缉鍖呴噷鐨�)
			2銆佺杩涘害鏍忕殑楂�(鎸囩殑鏄彃浠剁殑椤堕儴绂昏繘搴︽爮鐨勪綅缃�)
			3銆佸欢杩熸椂闂�(璇ュ璁剧疆榧犳爣缁忚繃杩涘害鏍忓仠椤垮灏戞绉掑悗鎵嶆樉绀烘彃浠�)
			寤鸿涓€瀹氳璁剧疆寤舵椂鏃堕棿锛屼笉鐒跺綋榧犳爣鍦ㄨ繘搴︽爮涓婂垝杩囩殑鏃跺€欏氨浼氳鍙栬棰戝湴鍧€杩涜棰勮锛屽緢鍗犺祫婧�
		*/
        pm_repc: '',
		/*
		瑙嗛鍦板潃鏇挎崲绗︼紝璇ュ姛鑳戒富瑕佹槸鐢ㄦ潵鍋氱畝鍗曞姞瀵嗙殑鍔熻兘锛屼娇鐢ㄦ柟娉曞緢绠€鍗曪紝璇锋敞鎰忥紝鍙拡瀵筬鍊兼槸瑙嗛鍦板潃鐨勬椂鍊欐湁鏁堬紝鍏跺畠鍦版柟涓嶈兘浣跨敤銆傚叿浣撶殑璇锋煡鐪媓ttp://www.ckplayer.com/manual.php?id=4#title_25
		*/
        pm_spac: '|',
        /*
		瑙嗛鍦板潃闂撮殧绗︼紝杩欓噷涓昏鏄挱鏀惧娈佃棰戞椂浣跨敤鏅€氳皟鐢ㄦ柟寮忔垨缃戝潃璋冪敤鏂瑰紡鏃朵娇鐢ㄧ殑銆傞粯璁や娇鐢▅锛屽鏋滆棰戝湴鍧€閲屾湰韬瓨鍦▅鐨勮瘽闇€瑕佸彟澶栬缃竴涓棿闅旂锛屾敞鎰忥紝鍗充娇鍙湁涓€涓棰戜篃闇€瑕佽缃€傚彟澶栧湪浣跨敤rtmp鍗忚鎾斁瑙嗛鐨勬椂鍊欙紝濡傛灉瑙嗛瀛樺湪澶氱骇鐩綍鐨勮瘽锛岃繖閲岃鏀规垚鍏跺畠鐨勭鍙凤紝鍥犱负rtmp鍗忚鐨勮棰戝湴鍧€澶氱骇鐨勮瘽涔熼渶瑕佺敤鍒皘闅斿紑娴佸湴鍧€鍜屽疄渚嬪湴鍧€
		*/
        pm_fpac: 'file->f',
        /*
		璇ュ弬鏁扮殑鍔熻兘鏄妸鑷畾涔夌殑flashvars閲岀殑鍙橀噺鏇挎崲鎴恈kplayer閲屽搴旂殑鍙橀噺锛岄粯璁ょ殑鍙傛暟鐨勬剰鎬濇槸鎶奻lashvars閲岀殑file鍊兼浛鎹㈡垚f鍊硷紝鍥犱负ckplayer閲屽彧璁鍊硷紝澶氫釜鏇挎崲涔嬮棿鐢ㄧ珫绾块殧寮€
		*/
        pm_advtime: '2,0,-110,10,0,300,0',
        /*
		鍓嶇疆骞垮憡鍊掕鏃舵枃鏈綅缃紝鎾斁鍓嶇疆 骞垮憡鏃舵湁涓€掕鏃剁殑鏄剧ず鏂囨湰妗嗭紝杩欓噷鏄缃鏂囨湰妗嗙殑浣嶇疆鍜屽楂橈紝瀵归綈鏂瑰紡鐨勩€備竴鍏�7涓弬鏁帮紝鍒嗗埆琛ㄧず锛�
			1銆佹按骞冲榻愭柟寮忥紝0鏄乏瀵归綈锛�1鏄腑闂村榻愶紝2鏄彸瀵归綈
			2銆佸瀭鐩村榻愭柟寮忥紝0鏄笂瀵归綈锛�1鏄腑闂村榻愶紝2鏄綆閮ㄥ榻�
			3銆佹按骞充綅缃亸绉婚噺
			4銆佸瀭鐩翠綅缃亸绉婚噺
			5銆佹枃瀛楀榻愭柟寮忥紝0鏄乏瀵归綈锛�1鏄腑闂村榻愶紝2鏄彸瀵归綈锛�3鏄粯璁ゅ榻�
			6銆佹枃鏈瀹藉腑
			7銆佹枃鏈楂樺害
		*/
        pm_advstatus: '1,2,2,-200,-40',
        /*
		鍓嶇疆骞垮憡闈欓煶鎸夐挳锛岄潤闊虫寜閽彧鍦ㄦ槸瑙嗛骞垮憡鏃舵樉绀猴紝褰撶劧涔熷彲浠ユ帶鍒朵笉鏄剧ず
			1銆佹槸鍚︽樉绀�0涓嶆樉绀猴紝1鏄剧ず
			2銆佹按骞冲榻愭柟寮�
			3銆佸瀭鐩村榻愭柟寮�
			4銆佹按骞冲亸绉婚噺
			5銆佸瀭鐩村亸绉婚噺
		*/
        pm_advjp: '1,1,2,2,-100,-40',
        /*
		鍓嶇疆骞垮憡璺宠繃骞垮憡鎸夐挳鐨勪綅缃�
			1銆佹槸鍚︽樉绀�0涓嶆樉绀猴紝1鏄樉绀�
			2銆佽烦杩囨寜閽Е鍙戝璞�(鍊�0/1,0鏄洿鎺ヨ烦杞�,1鏄Е鍙慾s:function ckadjump(){})
			3銆佹按骞冲榻愭柟寮�
			4銆佸瀭鐩村榻愭柟寮�
			5銆佹按骞冲亸绉婚噺
			6銆佸瀭鐩村亸绉婚噺
		*/
        pm_padvc: '2,0,-13,-13',
        /*
		鏆傚仠骞垮憡鐨勫叧闂寜閽殑浣嶇疆
			1銆佹按骞冲榻愭柟寮�
			2銆佸瀭鐩村榻愭柟寮�
			3銆佹按骞冲亸绉婚噺
			4銆佸瀭鐩村亸绉婚噺
		*/
        pm_advms: '2,2,-46,-67',
        /*
		婊氬姩骞垮憡鍏抽棴鎸夐挳浣嶇疆
			1銆佹按骞冲榻愭柟寮�
			2銆佸瀭鐩村榻愭柟寮�
			3銆佹按骞冲亸绉婚噺
			4銆佸瀭鐩村亸绉婚噺
		*/
        pm_zip: '1,1,-20,-8,1,0,0',
        /*
		鍔犺浇鐨偆鍘嬬缉鍖呮椂鎻愮ず鏂囧瓧鐨勪綅缃�
			1銆佹按骞冲榻愭柟寮忥紝0鏄乏瀵归綈锛�1鏄腑闂村榻愶紝2鏄彸瀵归綈
			2銆佸瀭鐩村榻愭柟寮忥紝0鏄笂瀵归綈锛�1鏄腑闂村榻愶紝2鏄綆閮ㄥ榻�
			3銆佹按骞充綅缃亸绉婚噺
			4銆佸瀭鐩翠綅缃亸绉婚噺
			5銆佹枃瀛楀榻愭柟寮忥紝0鏄乏瀵归綈锛�1鏄腑闂村榻愶紝2鏄彸瀵归綈锛�3鏄粯璁ゅ榻�
			6銆佹枃鏈瀹藉腑
			7銆佹枃鏈楂樺害
		*/
        //pm_advmarquee: '1,2,50,-60,50,18,0,0x000000,50,0,20,1,15,2000',
		pm_advmarquee: '1,2,50,-70,50,20,0,0x000000,50,0,20,1,30,2000',
        /*
		婊氬姩骞垮憡鐨勬帶鍒讹紝瑕佷娇鐢ㄧ殑璇濋渶瑕佸湪setup閲岀殑绗�9涓弬鏁拌缃垚1
		杩欓噷鍒嗕簩绉嶆儏鍐�,鍓嶅叚涓弬鏁版槸瀹氫綅鎺у埗锛岀7涓弬鏁版槸璁剧疆瀹氫綅鏂瑰紡(0锛氱浉瀵瑰畾浣嶏紝1锛氱粷瀵瑰畾浣�)
		绗竴绉嶆儏鍐碉細绗�7涓弬鏁版槸0鐨勬椂鍊欙紝鐩稿瀹氫綅锛屽氨鏄挱鏀惧櫒闀垮鍙樺寲鐨勬椂鍊欙紝鎺у埗鏍忎篃璺熺潃鍙�
			1銆侀粯璁�1:涓棿瀵归綈
			2銆佷笂涓笅瀵归綈锛�0鏄笂锛�1鏄腑锛�2鏄笅锛�
			3銆佺宸﹁竟鐨勮窛绂�
			4銆乊杞村亸绉婚噺
			5銆佺鍙宠竟鐨勮窛绂�
			6銆侀珮搴�
			7銆佸畾浣嶆柟寮�
		绗簩绉嶆儏鍐碉細绗�7涓弬鏁版槸1鐨勬椂鍊欙紝缁濆瀹氫綅锛屽氨鏄挱鏀惧櫒闀垮鍙樺寲鐨勬椂鍊欙紝鎺у埗鏍忎笉璺熺潃鍙橈紝杩欑鏂瑰紡涓€鑸娇鐢ㄥ湪鎺у埗鏍忓ぇ灏忎笉鍙樼殑鏃跺€�
			1銆佸乏涓彸瀵归綈鏂瑰紡锛�0鏄乏锛�1鏄腑闂达紝2鏄彸锛�
			2銆佷笂涓笅瀵归綈锛�0鏄笂锛�1鏄腑锛�2鏄笅锛�
			3銆亁鍋忕Щ閲�
			4銆亂鍋忕Щ閲�
			5銆佸搴�
			6銆侀珮搴�
			7銆佸畾浣嶆柟寮�
		浠ヤ笂鏄墠7涓弬鏁扮殑浣滅敤
			8銆佹槸鏂囧瓧骞垮憡鐨勮儗鏅壊
			9銆佺疆鑳屾櫙鑹茬殑閫忔槑搴�
			10銆佹帶鍒舵粴鍔ㄦ柟鍚戯紝0鏄按骞虫粴鍔紙鍖呮嫭宸﹀彸锛夛紝1鏄笂涓嬫粴鍔紙鍖呮嫭鍚戜笂鍜屽悜涓嬶級
			11銆佺Щ鍔ㄧ殑鍗曚綅鏃堕暱锛屽嵆绉诲姩鍗曚綅鍍忕礌鎵€闇€瑕佺殑鏃堕暱锛屾绉�
			12銆佺Щ鍔ㄧ殑鍗曚綅鍍忕礌,姝ｆ暟鍚屽乏/涓婏紝璐熸暟鍚戝彸/涓�
			13銆佹槸琛岄珮锛岃繖涓湪璁剧疆鍚戜笂鎴栧悜涓嬫粴鍔ㄧ殑鏃跺€欐湁鐢ㄥ
			14銆佹帶鍒跺悜涓婃垨鍚戜笅婊氬姩鏃舵瘡娆″仠姝㈢殑鏃堕棿
		*/
		pm_glowfilter:'1,0x01485d, 100, 6, 3, 10, 1, 0, 0',
		/*
		婊氬姩鏂囧瓧骞垮憡鏄惁閲囩敤鍙戝厜婊ら暅
			1銆佹槸鍚︿娇鐢ㄥ彂鍏夋护闀滐紝0鏄笉閲囩敤锛�1鏄娇鐢�
			2銆�(default = 0xFF0000) 鈥� 鍏夋檿棰滆壊锛岄噰鐢ㄥ崄鍏繘鍒舵牸寮� 0xRRGGBB銆� 榛樿鍊间负 0xFF0000
			3銆�(default = 100) 鈥� 棰滆壊鐨� Alpha 閫忔槑搴﹀€笺€� 鏈夋晥鍊间负 0 鍒� 100銆� 渚嬪锛�25 璁剧疆閫忔槑搴︿负 25%
			4銆�(default = 6.0) 鈥� 姘村钩妯＄硦閲忋€� 鏈夋晥鍊间负 0 鍒� 255锛堟诞鐐癸級銆� 2 鐨勪箻鏂瑰€硷紙濡� 2銆�4銆�8銆�16 鍜� 32锛夌粡杩囦紭鍖栵紝鍛堢幇閫熷害姣斿叾瀹冨€兼洿蹇�
			5銆�(default = 6.0) 鈥� 鍨傜洿妯＄硦閲忋€� 鏈夋晥鍊间负 0 鍒� 255锛堟诞鐐癸級銆� 2 鐨勪箻鏂瑰€硷紙濡� 2銆�4銆�8銆�16 鍜� 32锛夌粡杩囦紭鍖栵紝鍛堢幇閫熷害姣斿叾瀹冨€兼洿蹇�
			6銆�(default = 2) 鈥斿厜鏅曠殑寮哄害銆� 璇ュ€艰秺楂橈紝鍏夋檿鐨勯鑹茶秺娣憋紝鑰屼笖鍙戝厜涓庤儗鏅箣闂寸殑瀵规瘮搴︿篃瓒婂己銆� 鏈夋晥鍊间负 0 鍒� 255
			7銆�(default = 1) 鈥� 搴旂敤婊ら暅鐨勬鏁�
			8銆�(default = 0) 鈥� 鎸囧畾鍙戝厜鏄惁涓哄唴渚у彂鍏夈€� 鍊� 1 鎸囧畾鍙戝厜鏄唴渚у彂鍏夈€� 鍊� 0 鎸囧畾鍙戝厜鏄渚у彂鍏夛紙瀵硅薄澶栫紭鍛ㄥ洿鐨勫彂鍏夛級
			9銆�(default = 0) 鈥� 鎸囧畾瀵硅薄鏄惁鍏锋湁鎸栫┖鏁堟灉銆� 鍊间负 1 灏嗕娇瀵硅薄鐨勫～鍏呭彉涓洪€忔槑锛屽苟鏄剧ず鏂囨。鐨勮儗鏅鑹�
		*/
        advmarquee: escape('{a href="http://www.dhyy.tv" target="_blank"}{font color="#FFFFFF" size="12" face="Microsoft YaHei"}璞嗚姳褰遍櫌姘镐箙缃戝潃dhyy.tv 鎰熻阿鍚勪綅鍒嗕韩鏈綉鍧€{/font}{/a}'),
        /*
		璇ュ鏄粴鍔ㄦ枃瀛楀箍鍛婄殑鍐呭锛屽鏋滀笉鎯冲湪杩欓噷璁剧疆锛屽氨鎶婅繖閲屾竻绌哄苟涓斿湪椤甸潰涓娇鐢╦s鐨勫嚱鏁板畾涔塮unction ckmarqueeadv(){return '骞垮憡鍐呭'}
		*/
		mainfuntion:'',
		/*
		褰揻lashvars閲宻=3/4鏃讹紝璋冪敤鐨勫嚱鏁板寘鍚嶇О锛岄粯璁や负绌猴紝璋冪敤鏃堕棿杞翠笂鐨勫嚱鏁皊etAppObj
		*/
		flashplayer:'',
		/*
		褰揻lashvars閲岀殑s=3/4鏃讹紝涔熷彲浠ユ妸swf鏂囦欢鏀惧湪杩欓噷
		*/
		calljs:'ckplayer_status,ckadjump,playerstop,ckmarqueeadv',
		/*
			1銆佸叏灞€鐩戝惉杩斿洖缁撴灉鐨勫嚱鏁�
			2銆佽烦杩囧箍鍛婄殑鍑芥暟
			3銆佹挱鏀剧粨鏉熸椂璋冪敤鐨刯s鍑芥暟
			4銆佸姞杞芥粴鍔ㄦ枃瀛楀箍鍛婄殑鍑�
		*/
        myweb: escape(''),
        /*
		------------------------------------------------------------------------------------------------------------------
		浠ヤ笅鍐呭閮ㄤ唤鏄拰鎻掍欢鐩稿叧鐨勯厤缃紝璇锋敞鎰忥紝鑷畾涔夋彃浠朵互鍙婂叾閰嶇疆鐨勫懡鍚嶆柟寮忚娉ㄦ剰锛屼笉瑕佸拰绯荤粺鐨勭浉閲嶅锛屼笉鐒跺氨浼氭浛鎹㈡帀绯荤粺鐨勭浉鍏宠缃紝鍒犻櫎鐩稿叧鎻掍欢鐨勮瘽涔熷彲浠ュ悓鏃跺垹闄ょ浉鍏崇殑閰嶇疆
		------------------------------------------------------------------------------------------------------------------
		浠ヤ笅鍐呭瀹氫箟鑷畾涔夋彃浠剁殑鐩稿叧閰嶇疆锛岃繖閲屼篃鍙互鑷畾涔変换浣曡嚜宸辩殑鎻掍欢闇€瑕侀厤缃殑鍐呭锛屽綋鐒讹紝濡傛灉浣犳煇涓彃浠朵笉浣跨敤鐨勮瘽锛屼篃鍙互鍒犻櫎鐩稿叧鐨勯厤缃�
		------------------------------------------------------------------------------------------------------------------
		*/
        cpt_lights: '1',
		/*
		璇ュ瀹氫箟鏄惁浣跨敤寮€鍏崇伅锛屼娇鐢ㄥ紑鐏晥鏋滄椂璋冪敤椤甸潰鐨刯s鍑芥暟function closelights(){}锛屽叧鐏皟鐢� function closelights(){};
		*/
        cpt_share: 'ckplayer/share.xml',
        /*
		鍒嗕韩鎻掍欢璋冪敤鐨勯厤缃枃浠跺湴鍧€,姝よ璁剧疆鎴愮┖锛屽垯涓嶅惎鐢ㄥ垎浜寜閽�
		璋冪敤鎻掍欢寮€濮�
		*/
        cpt_list: ckcpt()
        /*
		ckcpt()鏄湰鏂囦欢鏈€涓婃柟鐨勫畾涔夋彃浠剁殑鍑芥暟
		*/
    }
    return ck;
}
/*
html5閮ㄥ垎寮€濮�
浠ヤ笅浠ｇ爜鏄敮鎸乭tml5鐨勶紝濡傛灉浣犱笉闇€瑕侊紝鍙互鍒犻櫎銆�
html5浠ｇ爜鍧楃殑浠ｇ爜鍙互闅忔剰鏇存敼浠ラ€傚悎浣犵殑搴旂敤锛屾杩庡埌璁哄潧浜ゆ祦鏇存敼蹇冨緱
*/
(function() {
    var CKobject = {
        _K_: function(d){return document.getElementById(d);},
        _T_: false,
		_M_: false,
		_G_: false,
		_Y_: false,
		_I_: null,
		_J_: 0,
		_O_: {},
		uaMatch:function(u,rMsie,rFirefox,rOpera,rChrome,rSafari,rSafari2,mozilla,mobile){
			var match = rMsie.exec(u);
			if (match != null) {
				return {
					b: 'IE',
					v: match[2] || '0'
				}
			}
			match = rFirefox.exec(u);
			if (match != null) {
				return {
					b: match[1] || '',
					v: match[2] || '0'
				}
			}
			match = rOpera.exec(u);
			if (match != null) {
				return {
					b: match[1] || '',
					v: match[2] || '0'
				}
			}
			match = rChrome.exec(u);
			if (match != null) {
				return {
					b: match[1] || '',
					v: match[2] || '0'
				}
			}
			match = rSafari.exec(u);
			if (match != null) {
				return {
					b: match[2] || '',
					v: match[1] || '0'
				}
			}
			match = rSafari2.exec(u);
			if (match != null) {
				return {
					b: match[1] || '',
					v: match[2] || '0'
				}
			}
			match = mozilla.exec(u);
			if (match != null) {
				return {
					b: match[1] || '',
					v: match[2] || '0'
				}
			}
			match = mobile.exec(u);
			if (match != null) {
				return {
					b: match[1] || '',
					v: match[2] || '0'
				}
			}
			else {
				return {
					b: 'unknown',
					v: '0'
				}
			}
		},
		browser: function() {
			var u = navigator.userAgent,
			rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
			rFirefox = /(firefox)\/([\w.]+)/,
			rOpera = /(opera).+version\/([\w.]+)/,
			rChrome = /(chrome)\/([\w.]+)/,
			rSafari = /version\/([\w.]+).*(safari)/,
			rSafari2 = /(safari)\/([\w.]+)/,
			mozilla = /(mozilla)\/([\w.]+)/,
			mobile = /(mobile)\/([\w.]+)/;
			var c = u.toLowerCase();
			var d = this.uaMatch(c,rMsie,rFirefox,rOpera,rChrome,rSafari,rSafari2,mozilla,mobile);
			if (d.b) {
				b = d.b;
				v = d.v;
			}
			return {B: b, V: v};
        },
        Platform: function() {
            var w = '';
            var u = navigator.userAgent,
            app = navigator.appVersion;
            var b = {
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
				trident: u.indexOf('Trident') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                presto: u.indexOf('Presto') > -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
                webApp: u.indexOf('Safari') == -1
            };
            for (var k in b) {
                if (b[k]) {
                    w = k;
                    break;
                }
            }
            return w;
        },
		isHTML5:function(){
			return !!document.createElement('video').canPlayType;
		},
		getType:function(){
			return this._T_;
		},
        getVideo: function() {
            var v = '';
            var s = this._E_['v'];
            if (s && s.length>1) {
                for (var i = 0; i < s.length; i++) {
                    var a = s[i].split('->');
                    if (a.length >= 1 && a[0] != '') {
                        v += '<source src="' + a[0] + '"';
                    }
                    if (a.length >= 2 && a[1] != '') {
                        v += ' type="' + a[1] + '"';
                    }
                    v += '>';
                }
            }
            return v;
        },
        getVars: function(k) {
			var o=this._A_;
			if (typeof(o) == 'undefined') {
				return null;
			}
            if (k in o) {
                return o[k];
            } else {
                return null;
            }
        },
        getParams: function() {
            var p = '';
            if (this._A_) {
                if (parseInt(this.getVars('p')) == 1) {
                    p += ' autoplay="autoplay"';
                }
                if (parseInt(this.getVars('e')) == 1) {
                    p += ' loop="loop"';
                }
                if (parseInt(this.getVars('p')) == 2) {
                    p += ' preload="metadata"';
                }
                if (this.getVars('i')) {
                    p += ' poster="' + this.getVars('i') + '"';
                }
            }
            return p;
        },
        getpath: function(z) {
			var f='CDEFGHIJKLMNOPQRSTUVWXYZcdefghijklmnopqrstuvwxyz';
			var w=z.substr(0,1);
			if(f.indexOf(w)>-1 && (z.substr(0,4)==w+'://' || z.substr(0,4)==w+':\\')){
				return z;
			}
            var d = unescape(window.location.href).replace('file:///', '');
            var k = parseInt(document.location.port);
            var u = document.location.protocol + '//' + document.location.hostname;
            var l = '',
            e = '',
            t = '';
            var s = 0;
            var r = unescape(z).split('//');
            if (r.length > 0) {
                l = r[0] + '//'
            }
            var h = 'http|https|ftp|rtsp|mms|ftp|rtmp|file';
            var a = h.split('|');
            if (k != 80 && k) {
                u += ':' + k;
            }
            for (i = 0; i < a.length; i++) {
                if ((a[i] + '://') == l) {
                    s = 1;
                    break;
                }
            }
            if (s == 0) {
                if (z.substr(0, 1) == '/') {
                    t = u + z;
                } else {
                    e = d.substring(0, d.lastIndexOf('/') + 1).replace('\\', '/');
                    var w = z.replace('../', './');
                    var u = w.split('./');
                    var n = u.length;
                    var r = w.replace('./', '');
                    var q = e.split('/');
                    var j = q.length - n;
                    for (i = 0; i < j; i++) {
                        t += q[i] + '/';
                    }
                    t += r;
                }
            } else {
                t = z;
            }
            return t;
        },
        getXhr: function() {
            var x;
            try {
                x = new ActiveXObject('Msxml2.XMLHTTP');
            } catch(e) {
                try {
                    x = new ActiveXObject('Microsoft.XMLHTTP');
                } catch(e) {
                    x = false;
                }
            }
            if (!x && typeof XMLHttpRequest != 'undefined') {
                x = new XMLHttpRequest();
            }
            return x;
        },
		getX: function(){
			var f='ckstyle()';
			if (this.getVars('x') && parseInt(this.getVars('c'))!=1 ) {
				f=this.getVars('x')+'()';
			}
			try {
				if (typeof(eval(f)) == 'object') {
					this._X_ = eval(f);
				}
			} catch(e) {
				try {
					if (typeof(eval(ckstyle)) == 'object') {
						this._X_ = ckstyle();
					}
				} catch(e) {
					this._X_ = ckstyle();
				}
			}
		},
		getSn: function(s, n) {
			if(n>=0){
				return this._X_[s].split(',')[n];
			}
			else{
				return this._X_[s];
			}
        },
		getUrl: function(L, B) {
			var C = this;
            var b = ['get', 'utf-8'];
            if (L && L.length == 2) {
                var a = L[0];
                var c = L[1].split('/');
                if (c.length >= 2) {
                    b[0] = c[1];
                }
                if (c.length >= 3) {
                    b[1] = c[2];
                }
                this.ajax(b[0], b[1], a,
                function(s) {
                    if (s && s != 'error') {
                        var d = '',
                        e = s;
                        if (s.indexOf('}') > -1) {
                            var f = s.split('}');
                            for (var i = 0; i < f.length - 1; i++) {
                                d += f[i] + '}';
                                var h = f[i].replace('{', '').split('->');
                                if (h.length == 2) {
                                    C._A_[h[0]] = h[1];
                                }
                            }
                            e = f[f.length - 1];
                        }
                        C._E_['v'] = e.split(',');
                        if (B) {
                            C.showHtml5();
                        } else {
                            C.changeParams(d);
                            C.newAdr();
                        }
                    }
                });
            }
        },
        getflashvars: function(s) {
            var v = '',
            i = 0;
            if (s) {
                for (var k in s) {
                    if (i > 0) {
                        v += '&';
                    }
                    if (k == 'f' && s[k] && ! this.getSn('pm_repc',-1)) {
                        s[k] = this.getpath(s[k]);
                        if (s[k].indexOf('&') > -1) {
                            s[k] = encodeURIComponent(s[k]);
                        }
                    }
                    if (k == 'y' && s[k]) {
                        s[k] = this.getpath(s[k]);
                    }
                    v += k + '=' + s[k];
                    i++;
                }
            }
            return v;
        },
        getparam: function(s) {
            var w = '',
            v = '',
            o = {
                allowScriptAccess: 'always',
                allowFullScreen: true,
                quality: 'high',
                bgcolor: '#000'
            };
            if (s) {
                for (var k in s) {
                    o[k] = s[k];
                }
            }
            for (var e in o) {
                w += e + '="' + o[e] + '" ';
                v += '<param name="' + e + '" value="' + o[e] + '" />';
            }
            w = w.replace('movie=', 'src=');
            return {
                w: w,
                v: v
            };
        },
        getObjectById: function(s) {
			var C = this;
            if (C._T_) {
				C._V_=C._K_(s)
                return C ;
            }
            var x = null,
            y = C._K_(s),
            r = 'embed';
            if (y && y.nodeName == 'OBJECT') {
                if (typeof y.SetVariable != 'undefined') {
                   x= y;
                } else {
                    var z = y.getElementsByTagName(r)[0];
                    if (z) {
                        x= z;
                    }
                }
            }
            return x;
        },
        ajax: function(b, u, s, f) {
            var x = this.getXhr();
            var a = [],
            m = '';
            if (b == 'get') {
                if (s.indexOf('?') > -1) {
                    m = s + '&t=' + new Date().getTime();
                } else {
                    m = s + '?t=' + new Date().getTime();
                }
                x.open('get', m);
            } else {
                a = s.split('?');
                s = a[0],
                m = a[1];
                x.open('post', s, true);
            }
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            x.setRequestHeader('charset', u);
            if (b == 'post') {
                x.send(m);
            } else {
                x.send(null);
            }
            x.onreadystatechange = function() {
                if (x.readyState == 4) {
                    var g = x.responseText;
                    if (g != '') {
                        f(g);
                    } else {
                        f(null);
                    }
                }
            }
        },
        addListener: function(e, f) {
			var o=this._V_;
			switch(e){
				case 'time':
					e='timeupdate';
					this.AT=f;
					f=this.addListenerTime;
					break;
				case 'totaltime':
					this.ATAll=f;
					return;
					break;
				default:
					break;
			}
			//console.log(typeof(f));
			if(typeof(f)=='string'){
				f=eval(f);
			}
            if (o.addEventListener) {
				try{
                	o.addEventListener(e, f, false);
				}
				catch (e) {
					 this.getNot();
				}
            }
			else if (o.attachEvent) {
				try{
                	o.attachEvent('on' + e, f);
				}
				catch(e){
					 this.getNot();
				}
            }
			else {
                o['on' + e] = f;
            }
        },
        removeListener: function( e, f) {
			var o=this._V_;
			switch(e){
				case 'time':
					e='timeupdate';
					this.AT=null;
					break;
				case 'totaltime':
					this.ATAll=null;
					return;
					break;
				default:
					break;
			}
			if(typeof(f)=='string'){
				f=eval(f);
			}
            if (o.removeEventListener) {
				try{
                	o.removeEventListener(e, f, false);
				}
				catch(e){
					 this.getNot();
				}
			}
			else if (o.detachEvent) {
				try{
                	o.detachEvent('on' + e, f);
				}
				catch(e){
					 this.getNot();
				}
			}
			else {
                o['on' + e] = null;
            }
        },
        Flash: function() {
            var f = false,v = 0;
            if (document.all  || this.browser()['B'].toLowerCase().indexOf('ie')>-1) {
                try {
                    var s = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    f = true;
                    var z = s.GetVariable('$version');
                    v = parseInt(z.split(' ')[1].split(',')[0]);
                } catch(e) {}
            } else {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var s = navigator.plugins['Shockwave Flash'];
                    if (s) {
                        f = true;
                        var w = s.description.split(' ');
                        for (var i = 0; i < w.length; ++i) {
                            if (isNaN(parseInt(w[i]))) continue;
                            v = parseInt(w[i]);
                        }
                    }
                }
            }
            return {
                f: f,
                v: v
            };
        },
		embed:function(f,d,i,w,h,b,v,e,p,j){
			var s=['all'];
			if(b){
				if(this.isHTML5()){
					this.embedHTML5(d,i,w,h,e,v,s,j);
				}
				else{
					this.embedSWF(f,d,i,w,h,v,p);
				}
			}
			else{
				if(this.Flash()['f'] && parseInt(this.Flash()['v'])>10){
					this.embedSWF(f,d,i,w,h,v,p);
				}
				else if(this.isHTML5()){
					this.embedHTML5(d,i,w,h,e,v,s,j);
				}
				else{
					this.embedSWF(f,d,i,w,h,v,p);
				}
			}
		},
		embedSWF: function(C, D, N, W, H, V, P) {
            if (!N) {
                N = 'ckplayer_a1'
            }
            if (!P) {
                P = {
                    bgcolor: '#FFF',
                    allowFullScreen: true,
                    allowScriptAccess: 'always',
					wmode:'transparent'
                };
            }
			this._A_=V;
			this.getX();
            var u = 'undefined',
			g = false,
            j = document,
            r = 'http://www.macromedia.com/go/getflashplayer',
            t = '<a href="' + r + '" target="_blank">璇风偣鍑绘澶勪笅杞藉畨瑁呮渶鏂扮殑flash鎻掍欢</a>',
            error = {
                w: '鎮ㄧ殑缃戦〉涓嶇鍚坵3c鏍囧噯锛屾棤娉曟樉绀烘挱鏀惧櫒',
                f: '鎮ㄦ病鏈夊畨瑁協lash鎻掍欢锛屾棤娉曟挱鏀捐棰戯紝' + t,
                v: '鎮ㄧ殑flash鎻掍欢鐗堟湰杩囦綆锛屾棤娉曟挱鏀捐棰戯紝' + t
            },
            w3c = typeof j.getElementById != u && typeof j.getElementsByTagName != u && typeof j.createElement != u,
            i = 'id="' + N + '" name="' + N + '" ',
            s = '',
            l = '';
            P['movie'] = C;
            P['flashvars'] = this.getflashvars(V);
			if(W==-1){
				d=true;
				this._K_(D).style.width='100%';
				W='100%';
			}
            s += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ';
            s += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
            s += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ';
            s += 'width="' + W + '" ';
            s += 'height="' + H + '" ';
            s += i;
            s += 'align="middle">';
            s += this.getparam(P)['v'];
            s += '<embed ';
            s += this.getparam(P)['w'];
            s += ' width="' + W + '" height="' + H + '" name="' + N + '" id="' + N + '" align="middle" ' + i;
            s += 'type="application/x-shockwave-flash" pluginspage="' + r + '" />';
            s += '</object>';
            if (!w3c) {
                l = error['w'];
				g = true;
            } else {
                if (!this.Flash()['f']) {
                    l = error['f'];
					g = true;
                } else {
                    if (this.Flash()['v'] < 11) {
                        l = error['v'];
						g = true;
                    } else {
                        l = s;
						this._T_=false;
                    }
                }
            }
            if (l) {
                this._K_(D).innerHTML = l;
            }
			if (g){
				this._K_(D).style.color = '#0066cc';
				this._K_(D).style.lineHeight = this._K_(D).style.height;
				this._K_(D).style.textAlign= 'center';
			}
        },
        embedHTML5: function(C, P, W, H, V, A, S, J) {
            this._E_ = {
                c: C,
                p: P,
                w: W,
                h: H,
                v: V,
                s: S,
				j: J==undefined || J?true:false
            };
            this._A_ = A;
			this.getX();
            b = this.browser()['B'],
            v = this.browser()['V'],
            x = v.split('.'),
            t = x[0],
            m = b + v,
            n = b + t,
            w = '',
            s = false,
            f = this.Flash()['f'],
            a = false;
            if (!S) {
                S = ['iPad', 'iPhone', 'ios'];
            }
            for (var i = 0; i < S.length; i++) {
                w = S[i];
                if (w.toLowerCase() == 'all') {
                    s = true;
                    break;
                }
                if (w.toLowerCase() == 'all+false' && !f) {
                    s = true;
                    break;
                }
                if (w.indexOf('+') > -1) {
                    w = w.split('+')[0];
                    a = true;
                } else {
                    a = false;
                }
                if (this.Platform() == w || m == w || n == w || b == w) {
                    if (a) {
                        if (!f) {
                            s = true;
                            break;
                        }
                    }else {
                        s = true;
                        break;
                    }
                }
            }
            if (s) {
                if (V) {
                    var l = V[0].split('->');
                    if (l && l.length == 2 && l[1].indexOf('ajax') > -1) {
                        this.getUrl(l, true);
                        return;
                    }
                }
                this.showHtml5();
            }
        },
        status: function() {
            this._H_ = parseInt(this.getSn('setup', 20));
			var f='ckplayer_status';
			if (this.getSn('calljs', 0)!='') {
				f=this.getSn('calljs', 0);
			}
			try {
				if (typeof(eval(f)) == 'function') {
					this._L_=eval(f);
					this._M_=true;
					return true;
				}
			} catch(e) {
				try {
					if (typeof(eval(ckplayer_status)) == 'function') {
						this._L_=ckplayer_status;
						this._M_=true;
						return true;
					}
				} catch(e) {
					return false;
				}
			}
			return false;
        },
        showHtml5: function() {
            var C = this;
            var p = C._E_['p'],
			a = C._E_['v'],
			c = C._E_['c'],
			j = '',
			b = false;
			var s = this._E_['v'];
			var w=C._E_['w'],h=C._E_['h'];
			var d=false;
			var r='';
			if(s.length==1){
				r=' src="'+s[0].split('->')[0]+'"';
			}
			if(w==-1){
				d=true;
				C._K_(c).style.width='100%';
				w='100%';
			}
			if(w.toString().indexOf('%')>-1){
				w='100%';
			}
			if(h.toString().indexOf('%')>-1){
				h='100%';
			}
			if(C._E_['j']){
				j=' controls="controls"';
			}
			var v = '<video'+j+r+' id="' + p + '" width="' + w + '" height="' + h + '"' + C.getParams() + ' webkit-playsinline>' + C.getVideo() + '</video>';
            C._K_(c).innerHTML = v;
            C._K_(c).style.backgroundColor = '#000';
            C._V_ = C._K_(p);
			if(!d){
				C._K_(c).style.width=C._E_['w'].toString().indexOf('%')>-1?(C._K_(c).offsetWidth*parseInt(C._E_['w'])*0.01)+'px':C._V_.width+'px';
				C._K_(c).style.height=C._E_['h'].toString().indexOf('%')>-1?(C._K_(c).offsetHeight*parseInt(C._E_['h'])*0.01)+'px':C._V_.height+'px';
			}
            C._P_ = false;
            C._T_ = true;
			if (C.getVars('loaded')!='') {
				var f=C.getVars('loaded')+'()';
				try {
                	if (typeof(eval(f)) == 'function') {
						eval(f);
					}
				} catch(e) {
					try {
						if (typeof(eval(loadedHandler)) == 'function') {
							loadedHandler();
						}
					} catch(e) {
					}
				}
            }
            C.status();
			C.addListener('play', C.playHandler);
			C.addListener('pause', C.playHandler);
			C.addListener('error', C.errorHandler);
			C.addListener('emptied', C.errorHandler);
			C.addListener('loadedmetadata', C.loadedMetadataHandler);
			C.addListener('ended', C.endedHandler);
			C.addListener('volumechange', C.volumeChangeHandler);
			if((C.getVars('m')!='' && C.getVars('m')!=null) || parseInt( C.getSn('setup', 0))>0){
				C._K_(c).style.cursor='pointer';
			}
			if((C.getVars('m')!='' && C.getVars('m')!=null) || parseInt( C.getSn('setup', 1))==1){
				C.addListener('click', C.html5Click);
			}
        },
		addListenerTime:function(){
			var C = CKobject;
			if(C.AT){
				C.AT(C._V_['currentTime']);
			}
		},
        videoPlay: function() {
            if (this._T_) {
                this._V_.play();
            }
        },
        videoPause: function() {
            if (this._T_) {
                this._V_.pause();
            }
        },
        playOrPause: function() {
            if (this._T_) {
                if (this._V_.paused) {
                    this._V_.play();
                } else {
                    this._V_.pause();
                }
            }
        },
        fastNext: function() {
            if (this._T_) {
                this._V_['currentTime'] = this._V_['currentTime'] + 10;
            }
        },
        fastBack: function() {
            if (this._T_) {
                this._V_['currentTime'] = this._V_['currentTime'] - 10;
            }
        },
        changeVolume: function(n) {
			if(n<0 || n>100){
				return;
			}
            if (this._T_) {
                this._V_['volume'] = n * 0.01;
            }
        },
        videoSeek: function(t) {
            if (this._T_) {
                this._V_['currentTime'] = t;
            }
        },
        newAddress: function(u) {
            var s = [];
            if (u) {
                s = this.isHtml5New(u);
            } else {
                return;
            }
            if (s && this._T_) {
                this.changeParams(u);
                var l = s[0].split('->');
                if (l && l.length == 2 && l[1].indexOf('ajax') > -1) {
                    this.getUrl(l, false);
                    return;
                }
                this._E_['v'] = s;
                this.newAdr();
            }
        },
		quitFullScreen:function() {
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			}
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
	   			document.webkitCancelFullScreen();
			}

		},
		changeStatus:function(n){
			this._H_=n;
		},
        newAdr: function() {
			var s = this._E_['v'];
            this._V_.pause();
			if(s.length==1){
            	this._V_.src=s[0].split('->')[0];
			}
			else{
				this._V_['innerHTML'] = this.getVideo();
			}
            this._V_.load();
        },
        isHtml5New: function(s) {
            if (s.indexOf('html5') == -1) {
                return false;
            }
            var a = s.replace(/{/g, '');
            var b = a.split('}');
            var c = '';
            for (var i = 0; i < b.length; i++) {
                if (b[i].indexOf('html5') > -1) {
                    c = b[i].replace('html5->', '').split(',');
                    break;
                }
            }
            return c;
        },
        changeParams: function(f) {
            if (f) {
                var a = f.replace(/{/g, '');
                var b = a.split('}');
                var c = '';
                for (var i = 0; i < b.length; i++) {
                    var d = b[i].split('->');
					if(d.length == 2){
						switch(d[0]){
							case 'p':
								if(parseInt(d[1]) == 1){
									this._V_.autoplay = true;
								}
								else if(parseInt(d[1]) == 2){
									this._V_.preload = 'metadata';
								}
								else{
									this._V_.autoplay = false;
									if(this._I_!=null){
										clearInterval(this._I_);
										this._I_=null;
									}
								}
								break;
							case 'e':
								if(parseInt(d[1]) == 1){
									this._V_.loop = true;
								}
								else{
									this._V_.loop = false;
								}
								break;
							case 'i':
								this._V_.poster = d[1];
								break;
							default:
								break;
						}
					}
                }
            }
        },
        frontAdPause: function(s) {
            this.getNot();
        },
        frontAdUnload: function() {
            this.getNot();
        },
        changeFace: function(s) {
            this.getNot();
        },
        plugin: function(a, b, c, d, e, f, g) {
            this.getNot();
        },
        videoClear: function() {
            this.getNot();
        },
        videoBrightness: function(s) {
            this.getNot();
        },
        videoContrast: function(s) {
            this.getNot();
        },
        videoSaturation: function(s) {
            this.getNot();
        },
        videoSetHue: function(s) {
            this.getNot();
        },
        videoWAndH: function(a, b) {
            this.getNot();
        },
        videoWHXY: function(a, b, c, d) {
            this.getNot();
        },
		changeFlashvars: function(a) {
            this.getNot();
        },
		changeMyObject: function(a, b) {
            this.getNot();
        },
		getMyObject: function(a, b) {
            this.getNot();
        },
		changeeFace: function() {
            this.getNot();
        },
		changeStyle: function(a, b) {
            this.getNot();
        },
		promptLoad: function() {
            this.getNot();
        },
		promptUnload: function() {
            this.getNot();
        },
		marqueeLoad: function(a,b) {
            this.getNot();
        },
		marqueeClose: function(s) {
            this.getNot();
        },
		videoError: function(s) {
            this.getNot();
        },
		formatUrl: function(s) {
            this.getNot();
        },
		sendJS: function(s) {
            this.getNot();
        },
		plugAttribute: function(s) {
            this.getNot();
        },
		errorTextShow: function(s) {
            this.getNot();
        },
		openUrl: function(s) {
            window.open(s);
        },
		jsonParse: function(s) {
            this.getNot();
        },
		promptShow: function(s,x,y) {
            this.getNot();
        },
		screenShot: function(s,x,y,x2,y2) {
            this.getNot();
        },
		fullScreen: function() {
            this.getNot();
        },
		allowFull: function() {
            this.getNot();
        },
		loadButton: function() {
            this.getNot();
        },
		getFile: function() {
            this.getNot();
        },
		textBoxShow:function() {
            this.getNot();
        },
		loadElement: function() {
            this.getNot();
        },
		textBoxClose: function() {
            this.getNot();
        },
		textBoxTween: function() {
            this.getNot();
        },
        getNot: function() {
            var s='The ckplayer\'s API for HTML5 does not exist';
			return s;
        },
        volumeChangeHandler: function() {
            var C = CKobject;
            if (C._V_.muted) {
                C.returnStatus('volumechange:0', 1);
                C._O_['volume'] = 0;
                C._O_['mute'] = true;
            } else {
                C._O_['mute'] = false;
                C._O_['volume'] = C._V_['volume'] * 100;
                C.returnStatus('volumechange:'+C._V_['volume'] * 100, 1);
            }
        },
        endedHandler: function() {
            var C = CKobject;
			var e=parseInt(C.getVars('e'));
            C.returnStatus('ended', 1);
			if(C._I_){
				clearInterval(C._I_);
				C._I_=null;
			}
            if ( e!= 0 && e !=4 && e !=6) {
                return;
            }
			if(e==6){
				this.quitFullScreen();
			}
			var f='playerstop()';
			if (C.getSn('calljs', 2)!='') {
				f=C.getSn('calljs', 2)+'()';
			}
			try {
				if (typeof(eval(f)) == 'function') {
					eval(f);
					return;
				}
			} catch(e) {
				try {
					if (typeof(eval(playerstop)) == 'function') {
						playerstop();
						return;
					}
				} catch(e) {
					return;
				}
			}
        },
        loadedMetadataHandler: function() {
            var C = CKobject;
            C.returnStatus('loadedmetadata', 1);
            C._O_['totalTime'] = C._V_['duration'];
            C._O_['width'] = C._V_['width'];
            C._O_['height'] = C._V_['height'];
            C._O_['awidth'] = C._V_['videoWidth'];
            C._O_['aheight'] = C._V_['videoHeight'];
            if (C._V_.defaultMuted) {
                C.returnStatus('volumechange:0', 1);
                C._O_['mute'] = true;
                C._O_['volume'] = 0;
            } else {
                C._O_['mute'] = false;
                C._O_['volume'] = C._V_['volume'] * 100;
                C.returnStatus('volumechange:'+C._V_['volume'] * 100, 1);
            }
			if (parseInt(C.getVars('p')) == 1) {
				C.playHandler();
			}
			if(C.ATAll){
				C.ATAll(C._V_['duration']);
			}
        },
        errorHandler: function() {
            CKobject.returnStatus('error', 1);
        },
        playHandler: function() {
            var C = CKobject;
            if (C._V_.paused) {
                C.returnStatus('pause', 1);
                C.addO('play', false);
				if(C._I_!=null){
					clearInterval(C._I_);
					C._I_=null;
				}
            } else {
                C.returnStatus('play', 1);
                C.addO('play', true);
                if (!C._P_) {
                    C.returnStatus('play', 1);
                    C._P_ = true;
                }
                C._I_ = setInterval(C.playTime, parseInt( C.getSn('setup', 37)));
				if(!C._G_){
					C._G_=true;
					for(var k in C._A_){
						if(k=='g' && C._A_[k]){
							var g=parseInt(C._A_[k]);
							C.videoSeek(g);
						}
					}
				}
				if(!C._Y_){
					C._Y_=true;
					for(var k in C._A_){
						if(k=='j' && C._A_[k]){
							var j=parseInt(C._A_[k]);
							if(j>0){
								C._J_=j;
							}
							else{
								C._J_=parseInt(C._O_['totalTime'])+j;
							}
						}
					}
				}
            }
        },
		html5Click: function(){
			//console.log(this);
			var C = CKobject;
			if(C.getVars('m')!='' && C.getVars('m')!=null){
				window.open(C.getVars('m'));
			}
		},
        returnStatus: function(s, j) {
            var h = s;
            if (this._H_ == 3) {
                h = this._E_['p'] +'->'+ h;
            }
            if (this._M_ && j <= this._H_ ) {
                this._L_(h);
            }
        },
        addO: function(s, z) {
            this._O_[s] = z;
        },
        getStatus: function() {
            return this._O_;
        },
        playTime: function() {
            var C = CKobject;
            var t = C._V_['currentTime'];
            C._O_['time'] = t;
			if(C._J_>0 && t>C._J_){
				C._J_=0;
				C.videoSeek(C._O_['totaltime']);
			}
            C.returnStatus('time:' + t, 1);
        }
    }
    window.CKobject = CKobject;
})();