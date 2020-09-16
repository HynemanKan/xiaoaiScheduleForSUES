/**
 * 上海工程技术大学教学系统课程表（内网）
 * 
 * @author hyneman
 * @version 1.0
 * 
 */

function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
//数位前端有个bug 
//主窗口的那个iframe的src与内容不同步，肯会出现切换到课表页但是iframe的src还是首页的情况，会导致chrome调试的时候拿不到弹出的窗口会是首页，手动修改一下src就行
mainframe = dom.getElementById("main").contentWindow.document;
targetframe = mainframe.getElementById("contentListFrame").contentWindow.document;
return targetframe.getElementsByTagName('html')[0].innerHTML
}