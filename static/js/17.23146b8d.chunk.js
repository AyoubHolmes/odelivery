(this.webpackJsonpodeliveryui=this.webpackJsonpodeliveryui||[]).push([[17],{401:function(e,a,t){},779:function(e,a,t){"use strict";t.r(a);var n=t(117),r=t(50),i=t(0),o=t.n(i),c=t(745),l=t(746),m=t(719),s=t(747),u=t(748),p=t(264),g=t.n(p),f=t(38),d=t(3),h=(t(401),function(e){return o.a.createElement("div",{className:"logo"},o.a.createElement("h1",{style:{color:"blue",fontSize:"50px"}},"Odelivery"),o.a.createElement("p",null,e.value))}),y=t(46);a.default=Object(d.withRouter)(g()((function(e){return{main:Object(r.a)({width:"auto",display:"block",marginLeft:e.spacing(3),marginRight:e.spacing(3)},e.breakpoints.up(400+2*e.spacing(3)),{width:500,marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(e.spacing(2),"px ").concat(e.spacing(3),"px ").concat(e.spacing(3),"px")},avatar:{margin:e.spacing(1),backgroundColor:e.palette.primary.main},form:{width:"90%",marginTop:e.spacing(1)},submit:{marginTop:e.spacing(3)}}}))((function(e){var a=e.classes,t=Object(i.useState)(""),r=Object(n.a)(t,2),p=r[0],g=r[1],d=Object(i.useState)(""),b=Object(n.a)(d,2),E=b[0],v=b[1];Object(i.useEffect)((function(){document.title="Login",y.a.getCurrentUsername()&&e.history.replace("../Main/Main")}),[]);return o.a.createElement("main",{className:a.main,style:{marginTop:"30px"}},o.a.createElement(h,{value:"Login to your Odelivery account"}),o.a.createElement(c.a,{className:a.paper,style:{marginBottom:"25px"}},o.a.createElement("form",{className:a.form,onSubmit:function(e){return e.preventDefault()&&!1}},o.a.createElement(l.a,{margin:"normal",required:!0,fullWidth:!0},o.a.createElement(m.a,{htmlFor:"email"},"Email Address"),o.a.createElement(s.a,{id:"email",name:"email",autoComplete:"off",value:p,onChange:function(e){return g(e.target.value)}})),o.a.createElement(l.a,{margin:"normal",required:!0,fullWidth:!0},o.a.createElement(m.a,{htmlFor:"password"},"Password"),o.a.createElement(s.a,{name:"password",type:"password",id:"password",autoComplete:"off",value:E,onChange:function(e){return v(e.target.value)}})),o.a.createElement(u.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",onClick:function(){y.a.login(p,E).then((function(a){e.history.replace("/main")})).catch((function(e){return window.confirm(e)}))},className:a.submit},"Sign in"),o.a.createElement("p",{style:{marginTop:"20px"}},"No account yet? ",o.a.createElement(f.b,{to:"/signup",style:{textDecoration:"none"}},"Get Started for free")))))})))}}]);
//# sourceMappingURL=17.23146b8d.chunk.js.map