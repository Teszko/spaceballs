#!/usr/bin/python

import networkx as nx
from networkx.drawing.nx_agraph import read_dot
G = read_dot("inkscape.dot")
cycles = list(nx.simple_cycles(G))
print cycles

