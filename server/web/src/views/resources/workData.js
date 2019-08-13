var processData= {
        "tr1":{
           title:'TR1',   //标题名称
           width: '10%',  //宽度
           color:"rgb(188, 240, 181)",
           childNode:{
               // 'pa':{
               //     title:'产品需求包',
               //     width:"100%",
               //     color:'#5fcc5f'
               // },
               'packageReview':{
                   title:'需求包评审',
                   width:"100%",
                   color:"rgb(216, 131, 174)",
                   // sameTime:true
               },
               'uiReview':{
                   title:'原型&设计稿评审',
                   width:"100%",
                   color:"rgb(248, 159, 163)",
                   sameTime:true
               }
           }
       },
        "tr2":{
           title:'TR2&TR3',   //标题名称
           width: '35%',  //宽度
           color:"rgb(137, 190, 149)",
           childNode:{
                'specificationReview':{
                   title:'规格评审',
                   width:"20%",
                   color:"rgb(242, 202, 140)"
               },
               'webDesign':{
                   title:'web设计',
                   width:"30%",
                   color:"rgb(253, 186, 236)"
               },
               'writeTest':{
                   title:'测试用例编写',
                   width:"30%",
                   color:"rgb(218, 152, 140)",
                   sameTime:true
               },
               'writeData':{
                   title:'数据接口文档',
                   width:"30%",
                   color:"rgb(224, 228, 144)",
                   sameTime:true
               },
               'coding':{
                   title:'代码编写',
                   width:"20%",
                   color:"rgb(228, 178, 152)"
               },
               'dataJoin':{
                   title:'数据联调',
                   width:"20%",
                   color:"rgb(194, 153, 179)"
               },
               'selfTest':{
                   title:'自测试',
                   width:"20%",
                   color:"rgb(230, 159, 133)",
                   sameTime:true
               },
               'checkCode':{
                   title:'代码走查',
                   width:"20%",
                   color:"rgb(229, 199, 212)",
                   sameTime:true
               },
               'bbit':{
                   title:'BBIT',
                   width:"10%",
                   color:"rgb(229, 199, 212)",
               },

           }
       },
         "tr4":{
           title:'TR4',   //标题名称
           width: '9%',  //宽度
           color:"rgb(153, 189, 192)",
           childNode:{
               'sit':{
                   title:'系统集成测试',
                   width:"100%",
                   color:"rgb(33, 153, 243)"
               }
           }
       },
         "tr5":{
           title:'TR5',   //标题名称
           width: '6%',  //宽度
           color:"rgb(184, 236, 252)",
           childNode:{
               'summary':{
                   title:'总结',
                   width:"100%",
                   color:"rgb(152, 202, 181)"
               }
           }
       },
   }

var detailData =  {
    'packageReview':{
        title:'需求包评审',
        input:[
            "《产品软件需求包》"
        ],
        output:[
            "评审通过的《产品软件需求包》",
            "项目计划"
        ],
        remarks:[
             {
                "type":'string',
                "content":"明确需求，确保无遗漏，无争议，能支持开发"
             },
             {
                "type":'string',
                "content":"清晰项目计划，并制定开发计划"
             }
        ]
    },
    'uiReview':{
        title:'原型&设计稿评审',
        input:[
            "1. 原型",
            "2. UI交互稿",
            "3. UI视觉稿"
        ],
        output:[
            "评审通过的原型和交互稿"
        ],
        remarks:[
             {
                "type":'string',
                "content":"原型必须通过UI原型评审列表所示标准《UI原型评审checklist表》，并对开发有指导作用，任何设计规格最终来源都是UI设计人员，而不是开发人员自定义"
             },
             {
                "type":'link',
                "content":"《UI交互设计内审》",
                "link":"UI交互设计内审.xlsx"
             },
             {
                "type":'link',
                "content":"《UI视觉设计内审》",
                "link":"UI视觉设计内审.xlsx"
             },
             {
                "type":'link',
                "content":"《UI视觉设计自查表》",
                "link":"UI视觉设计自查表.xlsx"
             },
             {
                "type":'link',
                "content":"《UI原型评审checklist表》",
                "link":"《UI原型评审checklist》V2.0.xlsx"
             }
        ]
    },
    'specificationReview':{
        title:'规格评审',
        input:[
            "软件规格-系统功能需求规格"
        ],
        output:[
            "评审通过的软件规格"
        ],
        remarks:[
            {
                "type":'string',
                "content":"软件规格中的系统功能需求规格必须包含正常、异常使用场景，输入限制，容错提示语"
            },
            {
                "type":'link',
                "content":"《浏览器与操作系统前端分层支持方案V2.0》",
                "link":'浏览器与操作系统前端分层支持方案V2.0.doc'
            },
            {
                "type":'link',
                "content":"《Tenda产品软件界面输入规格及反馈语标准》并附 WEB规格检查清单",
                "link":'Tenda产品软件界面输入规格及反馈语标准.xlsx'
            }
        ]
    },
   'webDesign':{
        title:'web设计',
        input:[
            "1. 《产品软件需求包》",
            "2. 《XX 软件规格设计文档》",
            "3. UI交互原型稿、UI视觉设计稿"
        ],
        output:[
            "1. 《XXX软件 WEB设计说明书》",
            "2. 《XXX软件 数据接口文档》"
        ],
        remarks:[
            {
                "type":'string',
                "content":"1、WEB框架设计 （现有软件框架分析）"
            },
            {
                "type":'string',
                "content":"2、业务逻辑流程分解  （业务场景）"
            },
            {
                "type":'string',
                "content":"3、功能函数实现设计  （逻辑）"
            },
            {
                "type":'string',
                "content":"4、数据接口文档定义"
            },{
                "type":'link',
                "content":"UI组接口参数命名及数据使用规范v1.0",
                "link":"UI组接口参数命名及数据使用规范v1.0.doc"
            }

        ]
    },
    'writeTest':{
        title:'测试用例编写',
        input:[
            "原型&规格"
        ],
        output:[
            "web设计文档"
        ],
        remarks:[
            {
                "type":'string',
                "content":"每个功能点覆盖约10-30个用例"
            }
        ]
    },
   'writeData':{
        title:'数据接口文档',
        input:[
            "UI原型&需求"
        ],
        output:[
            "接口文档"
        ],
        remarks:[
             {
                "type":'string',
                "content":"接口命名、取值语义化"
             },
             {
                "type":'link',
                "content":"UI组接口参数命名及数据使用规范v1.0",
                "link":"UI组接口参数命名及数据使用规范v1.0.doc"
             },
             {
                "type":'link',
                "content":"UI开发组拟定对外接口标准",
                "link":"UI开发组拟定对外接口标准.docx"
             }
        ]
    },
    'coding':{
        title:'Web编写',
        input:[
            "1. 《产品软件需求包》",
            "2. 《XXX软件 WEB设计说明书》",
            "3. 《XXX软件 数据接口文档》",
            "4. 《XX 软件规格设计文档》",
            "5.  UI交互原型稿、UI视觉设计稿",
            "6.  语言包"
        ],
        output:[
            "WEB软件系统",
            "  1、以功能点为划分依据，在开发过程中将界面设计，内容显示，容错性，业务逻辑性bug规避",
            "  2、这个阶段有可能未与后台进行接口数据联调而是采用本地服务器模拟数据接口的实现",
            "  3、语言包导入，资料部确认翻译后页面"
        ],
        remarks:[
             {
                "type":'string',
                "content":"根据功能划分：先设计，后开发，再测试"
             },
             {
                "type":'string',
                "content":"1、数据获取【从本地服务器或CGI获取回来的数据是否和接口文档定义的一致】",
             },
             {
                "type":'string',
                "content":"2、初始化【数据显示，交互事件初始化】",
             },
             {
                "type":'string',
                "content":"3、数据验证【提交数据校验，增删改查操作中的异常场景】",
             },
             {
                "type":'string',
                "content":"4、数据提交【注意提交前的交互操作以及提示】",
             },
             {
                "type":'string',
                "content":"5、回调处理【提示以及刷新】",
             }
        ]
    },
    'dataJoin':{
        title:'数据联调',
        title:'web设计',
        input:[ 
            "1. WEB软件系统",
            "2. 数据接口文档"
        ],
        output:[
            "通过页面配置功能可生效的完整界面"
        ],
        remarks:[
             {
                "type":'string',
                "content":"1、与CGI时行数据交互时是否有反馈机制（数据刷新、更新提示或重启等场景）"
             },
             {
                "type":'string',
                "content":"2、上传代码时需要进行代码检视【编码规范，业务逻辑，界面内容，界面设计，容错及提示等】",
             }
        ]
    },
    'selfTest':{
        title:'自测试',
        input:[
            "自测试用例"
        ],
        output:[
            "达到TR4标准的WEB软件系统"
        ],
        remarks:[
             {
                "type":'string',
                "content":"1、填写checklist表格，并测试对应内容"
             },
             {
                "type":'string',
                "content":"2、注意浏览器兼容和需求",
             },
             {
                "type":'link',
                "content":"软件版本转测试checklist表",
                "link":"checklist.xlsx"

             }
        ]
    },
    'checkCode':{
        title:'代码走查',
        input:[
            "1.自测试软件",
            "2.业务逻辑流程图",
            "3.代码设计流程图"
        ],
        output:[
            "走查通过的软件"
        ],
        remarks:[
             {
                "type":'string',
                "content":"1、发现已有问题"
             },
             {
                "type":'string',
                "content":"2、提出更好的设计方式",
             },
             {
                "type":'link',
                "content":"参考《ReasyTeam代码走查checklist》",
                "link":"ReasyTeam代码走查checklist.xlsx"
             }
        ]
    },
     'bbit':{
        title:'BBIT',
        input:[
            "转测试软件"
        ],
        output:[
            "回归通过后的转版本软件"
        ],
        remarks:[
            {
                "type":'string',
                "content":"1. bug分析&解决"
             },
             {
                "type":'string',
                "content":"2. 自测试 & 填写bugfree",
             },
             {
                "type":'string',
                "content":"3. 转测试驳回分析",
             }
        ]
    },
    'sit':{
        title:'SIT',
        input:[
            "转测试软件"
        ],
        output:[
            "回归通过后的转版本软件"
        ],
        remarks:[
            {
                "type":'string',
                "content":"1. bug分析&解决"
             },
             {
                "type":'string',
                "content":"2. 自测试 & 填写bugfree",
             },
             {
                "type":'string',
                "content":"3. 转测试驳回分析",
             },
             {
                "type":'string',
                "content":"4. TR4以后原则上不再进行需求变更，或界面优化类建议性问题",
             },
        ]
    },
    'summary':{
        title:'总结',
        input:[
            ""
        ],
        output:[
            "总结文档"
        ],
        remarks:[
            {
                "type":'string',
                "content":"根据bug统计分析结果对项目从质量、效率、技术、流程上的角度作总结，经验共享、差距补齐&解决"
            }, {
                "type":'link',
                "content":"WEB项目总结及bug分析模板",
                "link":"WEB项目总结及bug分析模板.xlsx"
            },
        ]
    },
}

var codeLines = [
    {
      "id":0,
      "label":"智能家居",
      expand:true,
      "children":[
        {
          "id":2,
          "label":"1200M路由11ac",
          "children":[
            {
              "id":6,
              "label":"【平台/芯片】：Linux-UGW5.0 /RTK",
              expand:true,
              "children":[
                {
                  "id":14,
                  "label":"【支撑项目】：AC9v3.0，AC18v1.0等",
                  expand:true,
                }
              ]
            },
            {
              "id":15,
              "label":"【平台/芯片】：Linux-UGW5.0 /BRCM",
              expand:true,
              "children":[
                {
                  "id":16,
                  "label":"【支撑项目】：AC15v1.0,AC7v1.0 备注：较少维护",
                  expand:true,
                }
              ]
            },
            {
              "id":7,
              "label":"【平台/芯片】：Linux-UGW6.0 /QCA",
              expand:true,
              "children":[
                {
                  "id":17,
                  "label":"【支撑项目】：AC10Uv1.0、AC21&AC23v1.0【1900M市场】",
                  expand:true,
                }
              ]
            },
            {
              "id":8,
              "label":"【平台/芯片】：ECOSv2.0 /RTK",
              expand:true,
              "children":[
                {
                  "id":18,
                  "label":"【支撑项目】：AC6v3.0， AC6v4.0， AC7v2.0，AC8v2.0,AC11v2.0 【技术栈】：fis3，sea.js ",
                  expand:true,
                }
              ]
            }
          ]
        },
        {
          "id":3,
          "label":"300M/600M路由器11n",
          "children":[
            {
              "id":9,
              "label":"【平台/芯片】：ECOSv2.0/RTK",
              expand:true,
              "children":[
                {
                  "id":19,
                  "label":"【支撑项目】：F9v1.0 【技术栈】：fis3，sea.js",
                  expand:true,
                }
              ]
            },
            
            {
              "id":10,
              "label":"【平台/芯片】：ECOSv3.0/QCA",
              expand:true,
              "children":[
                {
                  "id":20,
                  "label":"【支撑项目】：F3v4.0、F6v4.0、N301v4.0  【备注】：ECOS不区分版本，底层代码基本都是同一套 ",
                  expand:true,
                }
              ]
            }
          ]
        },
        {
          "id":4,
          "label":"MESH路由",
          expand:false,
          "children":[
            {
              "id":11,
              "label":"MW5Iv1.0 MW12v1.0待确认",
            },
          ]
        },
        {
          "id":5,
          "label":"Extender",
          "children":[
            {
              "id":12,
              "label":"【平台/芯片】：ECOSv3.0 /QCA",
              expand:true,
              "children":[
                {
                  "id":21,
                  "label":"【支撑项目】：A9v2.0、A301V3.0（单频）【技术栈】：webpack,Vue.js", 
                  expand:true,
                }
              ]
            },
            {
              "id":13,
              "label":"【平台/芯片】：ECOSv2.0 /RTK",
              expand:true,
              "children":[
                {
                  "id":22,
                  "label":"【支撑项目】：A18v2.0(双频)  【备注】：最新主线",
                  expand:true,
                },
                {
                  "id":23,
                  "label":"【支撑项目】：A18v1.0（双频）A301v1.0（单频） 【技术栈】：fis3，sea.js",
                  expand:true,
                },
                {
                  "id":24,
                  "label":"【支撑项目】：A9v1.0",
                  expand:true,
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id":0,
      "label":"企业网",
      expand:true,
      "children":[
        {
          "id":2,
          "label":"室内AP",
          "children":[
            {
              "id":6,
              "label":"【平台/芯片】：Linux-UGW5.0 /BRCM",
              expand:true,
              "children":[
                {
                  "id":14,
                  "label":"【支撑项目】：W40APv1.0, I9v1.0，AP325v1.0  【技术栈】：none",
                }
              ]
            },
            {
              "id":15,
              "label":"【平台/芯片】：Linux-UGW5.1 /RTK",
              expand:true,
              "children":[
                {
                  "id":16,
                  "label":"【支撑项目】：I21v1.0， W33APv1.0, W60APv1.0  【技术栈】：fis3，sea.js",
                },
                {
                  "id":16,
                  "label":"【支撑项目】：W9v1.0  【技术栈】：fis3，sea.js",
                },
              ]
            },
            {
              "id":7,
              "label":"【平台/芯片】：Linux-UGW6.0 /QCA",
              expand:true,
              "children":[
                {
                  "id":17,
                  "label":"【支撑项目】：AP350v1.0、W63APv1.0、I24v1.0  【技术栈】：webpack,reasyComponent, es6 【备注】：归一后的AP，AP与网桥的CGI，UI统一化",
                }
              ]
            }
          ]
        },
        {
          "id":3,
          "label":"网桥",
          "children":[
            {
              "id":9,
              "label":"【平台/芯片】：Linux-UGW6.0 /QCA",
              expand:true,
              "children":[
                {
                  "id":18,
                  "label":"【支撑项目】：O2v1.0，CPE6v1.0、B6&O4、AP4&AP5v1.0 【技术栈】：webpack,reasyComponent, es6",
                },
                {
                  "id":19,
                  "label":"【支撑项目】：O3v2.0",
                },
              ]
            },
            
            {
              "id":10,
              "label":"【平台/芯片】：Linux-UGW5.0 /RTK",
              expand:true,
              "children":[
                {
                  "id":20,
                  "label":"【支撑项目】：O1v1.0 【备注】：较少维护",
                }
              ]
            }
          ]
        },
        {
          "id":4,
          "label":"微企路由/微企mesh",
          "children":[
            {
              "id":11,
              "label":"【平台/芯片】：Linux-UGW6.0 /QCA",
              expand:true,
              "children":[
                {
                  "id":18,
                  "label":"【支撑项目】：W15Ev2.0\ W18Ev1.0 【技术栈】：webpack,reasyComponent, es6  【备注】：一套src 多套dist目录",
                },
                {
                  "id":19,
                  "label":"【支撑项目】：EW9v2.0",
                },
              ]
            },
          ]
        },
        {
          "id":5,
          "label":"AC",
          "children":[
            {
              "id":12,
              "label":"AC3000 【技术栈】：es6 【备注】：较少维护",
            },
          ]
        }
      ]
    },
    {
      "id":0,
      "label":"安防传输",
      expand:true,
      "children":[
        {
          "id":2,
          "label":"交换机",
          expand:false,

          "children":[
            {
              "id":6,
              "label":"TSW",
              expand:true,
              "children":[
                {
                  "id":14,
                  "label":"【支撑项目】：G3328Pv1.0  【技术栈】：webpack,vue, es6 " ,
                }
              ]
            },
          ]
        }
      ]
    }

  ];

var resourceTableData= [
    {
        name: '组内资料文档位置',
        description: '【各主线代码】',
        address: 'http://192.168.100.233:18080/svn/GNEUI',
    }, {
        name: '组内资料文档位置',
        description: '【主要存放培训课件、制度规范、项目总结文档等,svn用户名 全拼小写，密码123456】',
        address: 'http://192.168.99.17:8083/svn/软件开发部/05.资源组文件/04.前端开发'
    }, {
        name: '组内gitHub地址',
        description: '【主要存放组件源码及工具包等】',
        address: 'https://github.com/reasyTeam',
    }, {
        name: 'bugfree',
        description: '【查看项目bug，关闭bug】',
        address: 'http://192.168.100.23/bugfree/index.php?r=site/login'
    },{
        name: '中转文件位置',
        description: '【 用于公司电脑之间，文件中转 】',
        address: 'http://192.168.99.241-999中转文件夹'
    }, {
        name: 'testLink',
        description: '【 测试用例  用户名 全拼小写 密码123456 】',
        address: 'http://192.168.100.23/testlink/index.php?caller=login'
    },{
        name: 'eoa',
        description: '【 考勤查询，请假签卡流程提交  】',
        address: 'http://eoa.tenda.cn'
    },{
        name: 'agile',
        description: '【 项目情况，填写工时 】',
        address: 'http://plm.tenda.cn:7001/Agile/default/login-cms.jsp'
    }, {
        name: 'CI服务器路径',
        description: '【 在线工具等 用户名 中文用户名  密码 全拼小写 】',
        address: 'http://192.168.99.17'
    }];

var  toolTableData=[{
    name: '翻译工具',
    description: '【组内翻译工具】',
    address: 'https://github.com/reasyTeam/b28-cli'
}];

export {
    processData,detailData,codeLines,resourceTableData,toolTableData
}
