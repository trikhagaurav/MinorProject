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
plt.xticks(rotation=360)
plt.xlabel('Gender')
plt.ylabel('Count')
plt.tight_layout()
plt.show()
df.Careplans.value_counts().plot(kind='bar');plt.title('Careplans')
plt.xlabel('Careplans')
plt.ylabel('Count')
plt.show()
bycare.unstack().plot(kind='bar');plt.title('Careplans among Males and Females')
plt.xlabel('Careplans')
plt.ylabel('Count')
plt.show()
prob_gen = df.groupby(df['Problem']).GENDER.value_counts(normalize=True)
df.Problem.value_counts().plot(kind='barh');plt.title('Medical Problems')
plt.ylabel('Medical Problems')
plt.xlabel('Count')
plt.show()
prob_gen.unstack().plot(kind='bar');plt.title('Medical Problem among Males and Females')
plt.xlabel('Careplans')
plt.ylabel('Count')
plt.show()
prob_maritial = df.groupby(df['Problem']).MARITAL.value_counts(normalize=True)
prob_maritial.unstack().plot(kind='bar');plt.title('Medical Problem with respect to Marital Status')
plt.xlabel('Medical Problems')
plt.ylabel('Count')
plt.show()
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
now = pd.Timestamp('now')
df['BIRTHDATE'] = pd.to_datetime(df['BIRTHDATE'])
df['BIRTHDATE'] = df['BIRTHDATE'].where(df['BIRTHDATE'] < now, df['BIRTHDATE'] -  np.timedelta64(100, 'Y'))
df['AGE'] = (now - df['BIRTHDATE']).astype('<m8[Y]')
df['AGE'].replace({97:79,95:93,107:70,110:80,105:85,108:80,100:83,106:79,102:72,98:78,103:73,109:82},inplace=True)
df['AgeGroup'] = pd.cut(df.AGE,[0,10,20,40,60,80,100], labels=['0-10','10-20','20-40','40-60','60-80','80-100'])
prob_age = df.groupby(df['AgeGroup']).Problem.value_counts(normalize=True)
for i in range(0,50,5):
       prob_age.unstack().iloc[:, i:i+5].plot(kind='bar');plt.title('Medical Problems among various Age Groups')
       plt.xlabel('Age Group')
       plt.ylabel('Count')
       plt.tight_layout()
       plt.xticks(rotation=360)
       plt.show()
       pass
df['DATE'] = pd.DataFrame(data2['START'])
df['DATE'] = pd.to_datetime(df['DATE'], dayfirst=True, infer_datetime_format = True)
reasons = df["Problem"].unique()
df['Problem'] = df['Problem'].astype('category')
df = df.set_index('DATE')
grouped = df.groupby('Problem')
for key, group in grouped:
       data = grouped.get_group('Acute bronchitis').groupby(lambda x: x.year).count()
       data['Problem'].plot(title='Acute bronchitis cases (2011-2020)', label='')
plt.xlim(2011, 2020)
plt.ylim(0,25)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.tight_layout()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Alzheimer's disease").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Alzheimer's disease cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,5)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Prediabetes").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Prediabetes cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Hypertension").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Hypertension cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Asthma").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Asthma cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Hyperlipidemia").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Hyperlipidemia cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Whopping cough").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Whopping cough cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Diabetes").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Diabetes cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()
for key, group in grouped:
       data = grouped.get_group("Chronic congestive heart failure").groupby(lambda x: x.year).count()
       data['Problem'].plot(title="Chronic congestive heart failure cases (2011-2020)", label='')
plt.xlim(2011, 2020)
plt.ylim(0,20)
plt.xlabel('Year')
plt.ylabel('Count')
plt.legend()
plt.show()

