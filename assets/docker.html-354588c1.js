import{_ as e,p as o,q as t,a1 as r}from"./framework-5866ffd3.js";const a={},i=r('<h2 id="container" tabindex="-1"><a class="header-anchor" href="#container" aria-hidden="true">#</a> Container</h2><p>Suggest to use podman</p><p>Apple Silcon:</p><p>brew install simnalamburt/x/podman-apple-silicon podman machine init --cpus=2 --disk-size=20 --memory 1000</p><p>Refer: https://edofic.com/posts/2021-09-12-podman-m1-amd64/</p><p>Error: short-name resolution enforced but cannot prompt without a TTYr podman machine ssh</p><p>sed -i &#39;s/short-name-mode=&quot;enforcing&quot;/short-name-mode=&quot;permissive&quot;/g&#39; /etc/containers/registries.conf unqualified-search-registries = [&quot;docker.io&quot;, &quot;registry.fedoraproject.org&quot;, &quot;registry.access.redhat.com&quot;, &quot;quay.io&quot;]</p><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2><p>$docker exec -it -e COLUMNS=$(tput cols) -e LINES=$(tput lines) airdb/go bash</p><p>$ docker save myimage:latest | gzip &gt; myimage_latest.tar.gz $ docker save -o fedora-all.tar fedora</p><p>$ docker import /path/to/exampleimage.tgz $ sudo tar -c . | docker import --change &quot;ENV DEBUG=true&quot; - exampleimagedir</p>',11),s=[i];function c(n,d){return o(),t("div",null,s)}const m=e(a,[["render",c],["__file","docker.html.vue"]]);export{m as default};