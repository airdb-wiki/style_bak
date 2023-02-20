import{_ as e,p as r,q as a,a1 as t}from"./framework-5866ffd3.js";const n={},i=t(`<h1 id="golang-编码规范指南" tabindex="-1"><a class="header-anchor" href="#golang-编码规范指南" aria-hidden="true">#</a> Golang 编码规范指南</h1><p>关于代码规范，每个公司、甚至每个团队都有不同的规范，并且有不同的理解。</p><p>这份编码规范是参考别的规范，结合自己的实际情况而修订的，并尝试着让身边的朋友也遵守这个。 核心的目的还是为了便于广阅读，减少可避免的 bug 和安全隐患。</p><p>如果你的代码没有办法找到下面的规范，那么就遵循标准库的规范，多阅读标准库的源码，标准库的代码可以说是写代码参考的标杆。</p><h2 id="行长约定" tabindex="-1"><a class="header-anchor" href="#行长约定" aria-hidden="true">#</a> 行长约定</h2><p>一行最长不超过 80 个字符，超过的请使用换行展示，尽量保持格式优雅。 如果使用 vim，请确认 ~/.vimrc 中设置有 set textwidth=80</p><p>网络在线, 频次随机(由讲师时间决定)</p><h2 id="package-名字" tabindex="-1"><a class="header-anchor" href="#package-名字" aria-hidden="true">#</a> package 名字</h2><p>保持 package 的名字和目录保持一致，尽量采取有意义的包名，简短，有意义，尽量和标准库不要冲突。</p><h2 id="import-规范" tabindex="-1"><a class="header-anchor" href="#import-规范" aria-hidden="true">#</a> import 规范</h2><p>import 在多行的情况下，goimports 会自动帮你格式化，但是我们这里还是规范一下import的一些规范，如果你在一个文件里面引入了一个package，还是建议采用如下格式：</p><pre><code>import (
    &quot;fmt&quot;
)
</code></pre><p>如果你的包引入了三种类型的包，标准库包，程序内部包，第三方包，建议采用如下方式进行组织你的包：</p><pre><code>import (
    &quot;encoding/json&quot;
    &quot;strings&quot;

    &quot;github.com/astaxie/beego&quot;
    &quot;github.com/go-sql-driver/mysql&quot;

    &quot;myproject/models&quot;
    &quot;myproject/controller&quot;
    &quot;myproject/utils&quot;

) 
</code></pre><p>有顺序的引入包，不同的类型采用空格分离，第一种实标准库，第二是第三方包, 第三是项目包。</p><p>在项目中不要使用相对路径引入包：</p><pre><code>import &quot;../net&quot;    // 这是不好的导入
import &quot;github.com/name/repo/net&quot; // 这是正确的做法
</code></pre><h2 id="变量申明" tabindex="-1"><a class="header-anchor" href="#变量申明" aria-hidden="true">#</a> 变量申明</h2><p>变量名采用驼峰标准，不要使用 <code>_</code> 来命名变量名，多个变量申明放在一起</p><p>在函数外部申明必须使用 var,不要采用 :=，容易踩到变量的作用域的问题。</p><h2 id="自定义类型的string循环问题" tabindex="-1"><a class="header-anchor" href="#自定义类型的string循环问题" aria-hidden="true">#</a> 自定义类型的string循环问题</h2><p>如果自定义的类型定义了 String 方法，那么在打印的时候会产生隐藏的一些 bug</p><pre><code>type MyInt int
func (m MyInt) String() string { 
    return fmt.Sprint(m)   //BUG:死循环
}

func(m MyInt) String() string { 
    return fmt.Sprint(int(m))   //这是安全的,因为我们内部进行了类型转换
}
</code></pre><h2 id="避免返回命名的参数" tabindex="-1"><a class="header-anchor" href="#避免返回命名的参数" aria-hidden="true">#</a> 避免返回命名的参数</h2><p>返回变量及值，尽量在 func 行进行定义, 方便理解函数输入、输出。 func foo(a int, b int) (status, msg string, flag bool){ }</p><h2 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h2><p>错误处理的原则就是不能丢弃任何有返回 err 的调用，不要采用 <code>_</code> 丢弃，必须全部处理。接到错误，要么返回 err，要么实在不行就 panic， 或者使用 Log 记录下来。</p><h2 id="error-信息" tabindex="-1"><a class="header-anchor" href="#error-信息" aria-hidden="true">#</a> error 信息</h2><p>error 的信息不要采用大写字母，尽量保持你的错误简短，但是要足够表达你的错误的意思。</p><h2 id="长句子打印或者调用-使用参数进行格式化分行" tabindex="-1"><a class="header-anchor" href="#长句子打印或者调用-使用参数进行格式化分行" aria-hidden="true">#</a> 长句子打印或者调用，使用参数进行格式化分行</h2><p>我们在调用 fmt.Sprint 或者 log.Sprint 之类的函数时，有时候会遇到很长的句子，我们需要在参数调用处进行多行分割：</p><p>下面是错误的方式： log.Printf(&quot;A long format string: %s %d %d %s&quot;, myStringParameter, len(a), expected.Size, defrobnicate(“Anotherlongstringparameter”, expected.Growth.Nanoseconds() / 1e6))</p><p>应该是如下的方式：</p><pre><code>log.Printf( 
    &quot;A long format string: %s %d %d %s&quot;, 
    myStringParameter,
    len(a),
    expected.Size,
    defrobnicate(
        “Anotherlongstringparameter”,
        expected.Growth.Nanoseconds() / 1e6, 
    ),
)
</code></pre><h2 id="注意闭包的调用" tabindex="-1"><a class="header-anchor" href="#注意闭包的调用" aria-hidden="true">#</a> 注意闭包的调用</h2><p>在循环中调用函数或者goroutine方法，一定要采用显示的变量调用，不要再闭包函数里面调用循环的参数</p><pre><code>for i := 0; i &lt; limit; i++ {
    go func(){ DoSomething(i) }() //错误的做法
    go func(i int){ DoSomething(i) }(i)//正确的做法
}
</code></pre><p>http://golang.org/doc/articles/race_detector.html#Race_on_loop_counter</p><h2 id="在逻辑处理中禁用-panic" tabindex="-1"><a class="header-anchor" href="#在逻辑处理中禁用-panic" aria-hidden="true">#</a> 在逻辑处理中禁用 panic</h2><p>在main包中只有当实在不可运行的情况采用panic，例如文件无法打开，数据库无法连接导致程序无法</p><p>正常运行，但是对于其他的 package 对外的接口不能有 panic，只能在包内采用。</p><p>强烈建议在main包中使用 log.Fatal 来记录错误，这样就可以由 log 来结束程序。</p><h2 id="注释规范" tabindex="-1"><a class="header-anchor" href="#注释规范" aria-hidden="true">#</a> 注释规范</h2><p>注释可以帮我们很好的完成文档的工作，写得好的注释可以方便我们以后的维护。</p><ol><li>注释符号与注释内容之前有且只有一个空格。如 // i += 2。</li><li>注释的缩进，与当前代码缩进保持一致, 禁止从首字符进行注释。</li><li>难以理解或是不符合 unix 常规的代码，需要上func 上方描述，并说明输入及输出。</li></ol><p>详细的如何写注释可以参考：http://golang.org/doc/effective_go.html#commentary</p><h2 id="bug注释" tabindex="-1"><a class="header-anchor" href="#bug注释" aria-hidden="true">#</a> bug注释</h2><p>针对代码中出现的bug，可以采用如下教程使用特殊的注释，在godocs可以做到注释高亮：</p><pre><code>// BUG(dean): This divides by zero. 
var i float = 1/0
</code></pre><h2 id="struct规范" tabindex="-1"><a class="header-anchor" href="#struct规范" aria-hidden="true">#</a> struct规范</h2><p>struct申明和初始化格式采用多行： 定义如下：</p><pre><code>type User struct{
    Username  string
    Email     string
}
</code></pre><p>初始化如下：</p><pre><code>u := User {
    Username: &quot;dean&quot;,
    Email:    &quot;dean@airdb.com&quot;,
}
</code></pre><h2 id="recieved是值类型还是指针类型" tabindex="-1"><a class="header-anchor" href="#recieved是值类型还是指针类型" aria-hidden="true">#</a> recieved是值类型还是指针类型</h2><p>到底是采用值类型还是指针类型主要参考如下原则：</p><p>func(w Win) Tally(playerPlayer) int // w不会有任何改变 func(w *Win) Tally(playerPlayer) int // w会改变数据</p><p>更多的请参考：https://code.google.com/p/go-wiki/wiki/CodeReviewComments#Receiver_Type</p><h2 id="带-mutex-的-struct-必须是指针-receivers" tabindex="-1"><a class="header-anchor" href="#带-mutex-的-struct-必须是指针-receivers" aria-hidden="true">#</a> 带 mutex 的 struct 必须是指针 receivers</h2><p>如果你定义的 struct 中带有 mutex, 那么你的 receivers 必须是指针</p>`,60),o=[i];function d(c,p){return r(),a("div",null,o)}const s=e(n,[["render",d],["__file","go-coding-style.html.vue"]]);export{s as default};
