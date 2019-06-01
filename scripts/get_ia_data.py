from internetarchive import search_items
import json

search = search_items("Publisher:'Raphael Tuck & Sons' (title:and^100 OR description:and^15 OR collection:and^10 OR language:and^10 OR text:and^1) collection:Newberry", fields=['title','identifier'])
data = []
for s in search:
  s['id'] = s['identifier']
  del s['identifier']
  data.append(s)
js_object = "var IA_DATA=" + json.dumps(data) + "\n module.exports.ia_data = IA_DATA"
with open('/home/newberry/webapps/tuck/static/data/ia_data.js','w') as outfile:
  outfile.write(js_object)
with open('/home/newberry/webapps/tuck/lauder/static/data/ia_data.js','w') as outfile2:
  outfile2.write(js_object)
print("Successfully imported %d items from Internet Archive!" % len(data))