import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../widgets/app_drawer.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    var uId;
    var dn;
    if (FirebaseAuth.instance.currentUser != null) {
      uId = FirebaseAuth.instance.currentUser!.uid;
      dn = FirebaseAuth.instance.currentUser!.displayName;
    }

    return Scaffold(
      drawer: const AppDrawer(),
      appBar: AppBar(
        title: const Text("IDental"),
        actions: [
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/profile'),
            icon: const Icon(Icons.account_circle),
          )
        ],
      ),
      body: Column(
        children: [
          Text('UID: $uId'),
          Text('DisplayName: $dn'),
        ],
      ),
    );
  }
}
