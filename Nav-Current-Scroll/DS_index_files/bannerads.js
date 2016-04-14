OAS_url ='http://oas.services.bmj.com/RealMedia/ads/';
OAS_query = '';
OASListpos = 'Top,Right1';
OAS_sitepage = bannerAdsSiteName;
//end of configuration
OAS_version = 10;
OAS_rn = '001234567890'; OAS_rns = '1234567890';
OAS_rn = new String (Math.random()); OAS_rns = OAS_rn.substring (2, 11);
function OAS_NORMAL(pos) {
         document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OASListpos + '!' + pos + OAS_query + '" TARGET=_top>');
         document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OASListpos + '!' + pos + OAS_query + '" BORDER=0 ALT="Click!"></A>');
}

OAS_version = 11;
if (navigator.userAgent.indexOf('Mozilla/3') != -1)
{
         OAS_version = 10;
}
if (OAS_version >= 11)
{
document.write('<SC'+'RIPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OASListpos + OAS_query + '"><\/SCRIPT>');
}
document.write('');

function OAS_AD(pos) {
         if (OAS_version >= 11 && typeof(OAS_RICH)!='undefined')
         {
           OAS_RICH(pos);
         }
         else
         {
           OAS_NORMAL(pos);
         }
}

/*

-- Use these where you actually want the ads to appear.

<SCRIPT LANGUAGE='JavaScript'>
<!--OAS_AD('Top');//-->
</SCRIPT>

<SCRIPT LANGUAGE='JavaScript'>
<!--OAS_AD('Right1');//-->
</SCRIPT>

<SCRIPT LANGUAGE='JavaScript'>
<!--OAS_AD('Right2');//-->
</SCRIPT>

<SCRIPT LANGUAGE='JavaScript'>
<!--OAS_AD('Right3');//-->
</SCRIPT>
*/
