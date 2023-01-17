import 'package:flutter/material.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'IDental',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
          appBar: AppBar(
            title: Text("IDental"),
          ),
          body: Text("Пользователь авторизован"),
        ));
  }
}
