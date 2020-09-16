/**
 * 上海工程技术大学教学系统课程表（内网）
 * 
 * @author hyneman
 * @version 1.0
 * 
 */

/**
 *  此段注释来自树维 TaskActivity.js
 *  对教学周占用串进行缩略表示
 *  marsh a string contain only '0' or '1' which named "vaildWeeks" with length 53
 *  00000000001111111111111111100101010101010101010100000
 *     |     |--------------------------------------|
 *  (from) (startWeek)                         (endWeek)
 * from is start position with minimal value 1,in login it's calendar week start
 * startWeek is what's start position you want to mashal baseed on start,it also has minimal value 1 
 * endWeek is what's end position you want to mashal baseed on start,it also has minimal value 1
 */
function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //解析过程使用树维前端课表构建js，对js解析获得课表信息
    genScript = $("script")[17].children[0].data;//获取js内容
    genScript = genScript.split("\n");
    temp = genScript[genScript.length-3];//获取自然年与学年的映射，详情可参考树维的TaskActivity.js中marshal(weekOccupy,from,startWeek,endWeek)函数和相关注释
    nums = temp.split("(")[1].split(")")[0].split(",")
    var from=nums[0];
    var startWeek=nums[1];
    var endWeek=nums[2];
    console.log(from,startWeek,endWeek);
    //console.log(genScript);
    courses=[]
    var index = 0;
    while(index < genScript.length-1){
        line = genScript[index];
        console.log(courses);
        console.log(line);
        if(line.length>=10 && line.indexOf("//")==-1 && line.indexOf("var")==-1 && line.indexOf("fillTable")==-1 && line.indexOf("marshalTable")==-1){//跳过var等初始化相关行
            course=new Object();
            args = line.split(" ")[3].split(",");//解析课程实力生成行
            course["teacher"] = args[1].slice(1,-1);
            course["name"] = args[3].slice(1,-1);
            course["position"] = args[5].slice(1,-1);
            weekinfo = args[6].slice(1,-3);//自然年与学年转换
            weekinfo = weekinfo.slice(from-1) + weekinfo.slice(0,from);
            weeks = []
            for(i=startWeek-1;i<endWeek;i++){
                if (weekinfo[i]=="1"){
                    weeks.push(i+1);
                }
            }
            course["weeks"]=weeks;
            index++;
            sections= new Array();
            while(index < genScript.length){//寻找表格填充行，获取周信息和时段信息
                line = genScript[index]
                console.log("\t",line)
                console.log(line.search("unitCount")!=-1,)
                if(line.search("unitCount")!=-1){
                    console.log("a")
                    course["day"] = Number(line.split("=")[1].split("*")[0])+1;
                    section ={};
                    tempNum = Number(line.split("=")[1].split("+")[1].slice(0,-1))+1
                    if (tempNum>8 && tempNum<13){
                        tempNum+=2;
                    }else if(tempNum>12){
                        tempNum-=4;
                    }
                    section["section"] =tempNum;
                    sections.push(section);
                    index++;
                }else if(line.search("table0")!=-1){
                    console.log("b")
                    index++;
                }else if(line.search("new TaskActivity")!=-1){
                    console.log("c")
                    break;
                }else{
                    break;
                }
            }
            course["sections"]=sections;
            courses.push(course);
        }else{
            console.log("skip line");
            index++
        }
    }
    console.log(courses);
    sectionTimes = [
      {
        "section": 1,
        "startTime": "08:15",
        "endTime": "09:00"
      },
      {
        "section": 2,
        "startTime": "09:00",
        "endTime": "09:45"
      },
      {
        "section": 3,
        "startTime": "10:05",
        "endTime": "10:50"
      },
      {
        "section": 4,
        "startTime": "10:50",
        "endTime": "11:35"
      },
      {
        "section": 5,
        "startTime": "13:00",
        "endTime": "13:45"
      },
      {
        "section": 6,
        "startTime": "13:45",
        "endTime": "14:30"
      },
      {
        "section": 7,
        "startTime": "14:50",
        "endTime": "15:35"
      },
      {
        "section": 8,
        "startTime": "15:35",
        "endTime": "16:20"
      },
      {
        "section": 9,
        "startTime": "18:00",
        "endTime": "18:45"
      },
      {
        "section": 10,
        "startTime": "18:45",
        "endTime": "19:30"
      },
      {
        "section": 11,
        "startTime": "19:30",
        "endTime": "20:15"
      },
      {
        "section": 12,
        "startTime": "20:15",
        "endTime": "21:00"
      },
      {
        "section": 13,
        "startTime": "16:30",
        "endTime": "17:15"
      },
      {
        "section": 14,
        "startTime": "17:15",
        "endTime": "18:00"
      }
    ]
    return {
        courseInfos: courses,
        sectionTimes:sectionTimes
    }
}


