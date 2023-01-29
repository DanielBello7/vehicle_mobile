


import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from "react-native";
import { SIZES, TEXT } from "../constants";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useData } from '../context';
import { VehicleDataType } from "../global.types";
import QRCode from 'react-native-qrcode-svg';
import Spinner from '../components/Spinner';

type DetailValueProps = {
  title: string,
  value: string  
}

type ValidDetailsProps = {
  data: VehicleDataType
}

type ProfileProps = {
  data: VehicleDataType
}

type CodeProps = {
  data: string
}

type DetailsProps = {
  data: VehicleDataType
}

function FirstCap(text: string) {
  const first = text[0].toUpperCase();
  const remaining = text.slice(1, text.length);
  return first + remaining;
}

function Profile({data}: ProfileProps) {
  const { theme } = useData();

  return (
  <View style={styles.profile}>
  <View style={styles.img_box}>
    {
      data.img && data.img.trim() 
      ? <Image source={{uri: data.img}} style={styles.img} resizeMode="contain" />
      : <FontAwesome name="user-circle" size={70}/>
    }
  
  </View>
  <Text style={styles.name}>{`${FirstCap(data.firstname)} ${FirstCap(data.lastname)}`}</Text>
  <Text style={{...styles.validation, color: theme.main}}>
  {data.isVerified ? "Verified User" : "Unverified User"}
  </Text>
  </View>
  )
}

function Code({data}: CodeProps) {
  return (
  <View style={styles.code_box}>
  <View style={styles.qr_box}>
  <QRCode value={data} size={150}/>
  </View>
  </View>
  )
}

function DetailValue({title, value}: DetailValueProps) {
  const { theme } = useData();

  return (
  <View style={styles.detail_value_box}>
  <Text style={styles.name}>{value}</Text>
  <Text style={{...styles.validation, color: theme.main}}>{title}</Text>
  </View>
  )
}

function Details({data}: DetailsProps) {
  return (
  <View style={styles.details_box}>
  <DetailValue title="Validation Number" value={data._id} />
  <DetailValue title="Full Name" value={`${FirstCap(data.firstname)} ${FirstCap(data.lastname)}`} />
  <DetailValue title="License Plate" value={data.license.toUpperCase()} />
  <DetailValue title="Email" value={data.email} />
  </View>
  )
}

function InvalidCode() {
  return (
  <View style={styles.warning}>
  <AntDesign name="warning" size={120} color="red"/>
  <Text style={styles.warning_text}>
    Oops. The code you provided is 
    either unregistered or 
    invalid. Please provide another.
  </Text> 
  </View>
  )
}

function ValidDetails({data}: ValidDetailsProps) {
  return (
  <View style={{width: "100%"}}>
  <Profile data={data}/>
  <Code data={JSON.stringify(data)}/>
  <Details data={data}/>
  </View>
  )
}

export default function MoreDetailsScreen() {

  const {hasData, data, setHasData, axios, theme} = useData();

  const [isLoading, setLoading] = useState(true);

  const [current, setCurrent] = useState<VehicleDataType | null>(null);

  const Conversion = async () => {
    setLoading(true);

    const controller = new AbortController();

    setTimeout(() => controller.abort(), 10000);

    try {
      const result = JSON.parse(data);

      const check = await axios.get(`/registered/confirmation/${result._id}`, {signal: controller.signal});

      if (!check.data.found) {
        setCurrent(null);
        return setLoading(false);
      }

      setCurrent(result);
      return setLoading(false);
    }
    catch (error) {
      setCurrent(null);
      return setLoading(false);
    }
  }

  useEffect(() => {
    Conversion();
    if (hasData) return setHasData(false);
  }, []);

  return (
  <React.Fragment>
  <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
  <StatusBar barStyle="dark-content" />

    { 
      isLoading ? 
      <View style={styles.cont}>
      <Spinner color={theme.main} size={36}/>
      </View> 
      : !current ? <InvalidCode /> : <ValidDetails data={current}/> 
    }
    
  </ScrollView>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  profile: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.medium
  },
  img_box: {
    width: 70,
    height: 70,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.base
  },
  name: {
    fontWeight: "bold",
    fontSize: TEXT.small,
    textAlign: "center"
  },
  validation: {
    color: "#2196F3",
    fontWeight: "bold",
    letterSpacing: -0.5
  },
  img: {
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  code_box: {
    width: "100%",
    marginBottom: SIZES.medium,
    alignItems: "center",
    justifyContent: "center"
  },
  qr_box: {
    width: 150,
    height: 150,
  },
  details_box: {
    width: "100%"
  },
  detail_value_box: {
    alignItems: "center",paddingVertical: SIZES.base
  },
  last: {
    height: 100
  },
  warning: {
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center",
    paddingHorizontal: SIZES.large,
    marginTop: SIZES.massive
  },
  warning_text: {
    fontSize: TEXT.large, 
    fontWeight: "bold", 
    letterSpacing: -2.5,
    textAlign: "center",
    marginTop: SIZES.massive
  },
  cont: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.massive,
    paddingTop: SIZES.massive
  }
});