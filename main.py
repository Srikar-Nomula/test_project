import ast
import json

import pandas as pd
from flask import Flask, render_template, jsonify

app = Flask(__name__)
data = pd.read_csv('allergyBoundelss.csv')


@app.route('/')
def main():
    data = bar_graph()
    return render_template('home.html',data=data)



def bar_graph():
    # data_cleanup()
    plot_data = data.loc[(data['plottype'] == 'bargraph') & (data['acceptable_slice_size'] == 1)]
    data_list=[]
    # sub_dict={}
    temp_dict={}
    for row in plot_data.itertuples(index=True):
        temp_dict['first_attr'] = row.first_attr
        temp_dict['second_attr'] = row.second_attr
        temp_dict['slice'] = row.slice
        # process score
        str = row.metadata.split(",")
        temp_dict['score'] = str[2].split('"')[1]
        temp_dict['slice_size'] = row.slice_size
        # print(row.slice_size)
        temp_dict['t_data'] = convert_data(row.data)
        data_list.append(temp_dict)
        temp_dict={}

    return data_list

def convert_data(strdata):

    t_list = ast.literal_eval(strdata)
    t_list = t_list[0]
    # print(t_list)
    return t_list


if __name__ == "__main__":
    app.run(port=80)
