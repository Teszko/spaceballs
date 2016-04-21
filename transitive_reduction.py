#!/usr/bin/python

import networkx as nx
from networkx.drawing.nx_agraph import read_dot
from networkx.drawing.nx_agraph import write_dot
from networkx.readwrite import json_graph

#G = read_dot("all_nobreak.dot")
g = read_dot("inkscape-mergecycl2.dot")
cycles = list(nx.simple_cycles(g))
print cycles
for n1 in g.nodes_iter():
    if g.has_edge(n1, n1):
        g.remove_edge(n1, n1)
    for n2 in g.successors(n1):
        for n3 in g.successors(n2):
            for n4 in nx.dfs_preorder_nodes(g, n3):
                if g.has_edge(n1, n4):
                    g.remove_edge(n1, n4)    
#nx.write_graphml(g, "inkscape-reduced.graphml")
write_dot(g,"inkscape-reduced.dot")
nx.write_gml(g,"inkscape-reduced.gml")
g = nx.convert_node_labels_to_integers(g)
data = json_graph.node_link_data(g)
print data

#import json
#serial = json.dumps(data)
#print serial 

