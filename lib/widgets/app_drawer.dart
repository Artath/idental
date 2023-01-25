import 'package:flutter/material.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
                color: Colors.blue,
                image: DecorationImage(
                  image: AssetImage("assets/images/teeth.png"),
                     fit: BoxFit.cover)
              ),
            child: Column(
              children: const [
                Text('Menu'),
                //Image(image: AssetImage('assets/images/teeth.png')),
                
              ],
            ),
          ),
          ListTile(
            title: const Text('Profile'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/profile');
            },
          ),
          ListTile(
            title: const Text('Main'),
            onTap: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/main');
            },
          ),
        ],
      ),
    );
  }
}
