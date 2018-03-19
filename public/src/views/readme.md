所有应用的组件
例如，views/中一个名为Home的view，则在components/中就有一个名为Home的子文件夹
      Table.js       Home页面中的一个列表组件
      Table.css      列表组件对应的样式

这个目录下区分傻瓜组件（component）和聪明组件（container）
聪明组件最后需要使用connect函数
export default connect(mapStateToProps, mapDispatchToProps)(App);
mapStateToProps：把store上的状态转化为内层傻瓜组件的props；
mapDispatchToProps：把内层傻瓜组件中的用户动作转化为派送给store的动作；
APP：先执行connect函数，将connect返回的执行结果立刻执行app；
