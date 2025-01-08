## Vite
### 一：动态导入组件，实现按需加载 import.meta.glob
 Vite 独有的功能，该 Glob 模式会被当成导入标识符：必须是相对路径（以 ./ 开头）或绝对路径（以 / 开头，相对于项目根目录解析）或一个别名路径（请看 resolve.alias 选项)。
 例如：
 ```
const modules = import.meta.glob('../**/**/*.vue');
let result = modules['../system/user/info.vue'];
let curCom = ref(shallowRef(''));
curCom = markRaw(defineAsyncComponent(result));
 ```

 ## Axios 
 ### 一：iframe 跨域问题
 1.如果当前系统被iframe嵌套，需要允许设置cookie,仅支持https协议设置,否则使用sessionStorage
 ```
 export function setToken(token) {
	//如果当前系统被iframe嵌套，需要允许设置cookie,仅支持https协议设置
	if (window != window.parent) {
		return Cookies.set(TokenKey, token, { sameSite: "none", secure: true });
	}
	return Cookies.set(TokenKey, token);
}
 ```
