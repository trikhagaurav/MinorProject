import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

data2 = pd.read_csv('C:/Users/laksh/Desktop/Minor Project/minor project ploting graphs/careplans.csv')
df = pd.read_csv('C:/Users/laksh/Desktop/Minor Project/minor project ploting graphs/EMR_Data9.csv')
df["Careplans"].replace({"Physical therapy procedure": "Physical therapy", "Diabetes self management plan": "Diabetes self plan", "Lifestyle education regarding hypertension":"Hypertension care","Minor surgery care management (procedure)":"Minor surgery care","Asthma self management":"Asthma care","Hyperlipidemia clinical management plan":"Hyperlipidemia clinical care","Cancer care plan":"Cancer care","Chronic obstructive pulmonary disease clinical management plan":"Chronic obstructive pulmonary disease clinical care","Mental health care plan":"Mental health care","Major surgery care management":"Major surgery care","Inpatient care plan (record artifact)":"Inpatient care","Dialysis care plan (record artifact)":"Dialysis care"}, inplace=True)
df.drop(df.index[df['Careplans'] == 'Self-care interventions (procedure)'], inplace = True)
df.drop(df.index[df['Careplans'] == 'Care plan (record artifact)'], inplace = True)
df.drop(df.index[df['Careplans'] == 'Overactivity/inattention behavior management'], inplace = True)
df['Problem'].replace({"Acute bronchitis (disorder)":"Acute bronchitis","Concussion with no loss of consciousness":"Concussion","Localized  primary osteoarthritis of the hand":"Osteoarthritis of hand","Injury of tendon of the rotator cuff of shoulder":"Injury of tendon","Pulmonary emphysema (disorder)":"Pulmonary emphysema","Major depression  single episode":"Major depression","Concussion with loss of consciousness":"Concussion","Familial Alzheimer's disease of early onset (disorder)":"Familial Alzheimer's disease","Non-small cell carcinoma of lung  TNM stage 1 (disorder)":"TNM stage 1","Chronic congestive heart failure (disorder)":"Chronic congestive heart failure","Chronic obstructive bronchitis (disorder)":"Chronic obstructive bronchitis","Fracture of vertebral column without spinal cord injury":"Fracture of vertebral column","Alzheimer's disease (disorder)":"Alzheimer's disease","Concussion injury of brain":"Concussion"},inplace=True)
df['Problem'].replace({"Normal pregnancy":"Amebiasis","Childhood asthma":"Asthma","Fracture subluxation of wrist":"Whopping cough","Fracture of rib":"Dermatophytosis","Escherichia coli urinary tract infection":"Urinary tract infection","Injury of medial collateral ligament of knee":"collateral ligament injury","Overlapping malignant neoplasm of colon":"malignant neoplasm"}, inplace=True)
df['Careplans'].replace({"Chronic obstructive pulmonary disease clinical care":"Chronic disease care","Heart failure self management plan":"Heart failure care"},inplace=True)
bycare = df.groupby("Careplans").GENDER.value_counts(normalize=True)
df.GENDER.value_counts().plot(kind='bar',color={'Orange','Green'});plt.title('Gender')
print('Your Graphs are processed you can close the window')
prob_county = df.groupby(df['Problem']).COUNTY.value_counts(normalize=True)
for i in range(14):
       prob_county.unstack().iloc[0:, i].plot(kind='pie',startangle=15)
       plt.tight_layout()
       plt.axis('equal')
       plt.show()
for i in range(14):
       prob_county.unstack().iloc[0:, i].plot(kind='pie',startangle=15)
       centre_circle = plt.Circle((0, 0), 0.70, fc='white')
       fig = plt.gcf()
       fig.gca().add_artist(centre_circle)
       plt.tight_layout()
       plt.axis('equal')
       plt.show()
for i in range(14):
       prob_county.unstack().iloc[0:, i].plot(kind='bar', subplots=True)
       plt.show()