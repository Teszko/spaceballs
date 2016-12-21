#!/usr/bin/python

import json
import networkx as nx
from networkx.readwrite import json_graph
from networkx.drawing.nx_agraph import read_dot


#G=nx.grid_graph(dim=[6,6,8])
#G=nx.hypercube_graph(6)
#G=nx.grid_2d_graph(12,14)
#G=nx.barabasi_albert_graph(1000,1)
G=read_dot("inkscape3.dot")

# this d3 example uses the name attribute for the mouse-hover value,
# so add a name to each node

# unidirectional graphs only have G.neighbors(n)
for n in G:
    G.node[n]['name'] = n
    G.node[n]['deps'] = len(G.successors(n))
    G.node[n]['rdeps'] = len(G.predecessors(n))

# write json formatted data
d = json_graph.node_link_data(G) # node-link format to serialize
# write json
f = open('js/apt.js','w')
f.write('dep_json = `{"pkg":')

json.dump(d, f)
f.write('}`;')

f.close()
print('Wrote node-link JSON data')
nx.write_gexf(G, "inkscape.gexf")
