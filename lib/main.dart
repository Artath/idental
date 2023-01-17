import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';
import 'package:google_fonts/google_fonts.dart';
import 'main_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  FirebaseUIAuth.configureProviders([
    EmailAuthProvider(),
    // ... other providers
  ]);
  runApp(const MyApp());
}

/*class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IDental',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'IDental'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SignInScreen(
        actions: [
          AuthStateChangeAction<SignedIn>((context, state) {
            if (!state.user!.emailVerified) {
              Navigator.pushNamed(context, '/verify-email');
            } else {
              Navigator.pushReplacementNamed(context, '/profile');
            }
          }),
        ],
      ),

      /*Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'yet another test build',
              style: Theme.of(context).textTheme.headline6,
            ),
          ],
        ),
      ),*/
      /*floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("hello");
        },
        child: const Icon(Icons.add),
      ),*/
    );
  }
}*/

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        routes: {
          '/main': (context) => MainPage(),
        },
        title: 'IDental',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Stack(
          alignment: Alignment.topCenter,
          children: <Widget>[
            SignInScreen(
              actions: [
                AuthStateChangeAction<SignedIn>((context, state) {
                  if (!state.user!.emailVerified) {
                    //Navigator.pushNamed(context, '/verify-email');
                    Navigator.pushNamed(context, '/main');
                    print("asdasdasdasd");
                  } else {
                    //Navigator.pushReplacementNamed(context, '/profile');
                    print("QWEQWEQOWEJQWOIEJQWOIEH");
                  }
                }),
              ],
            ),
            Column(
              children: [
                const Padding(
                  padding: EdgeInsets.only(top: 30.0),
                  child: SizedBox(
                    height: 130,
                    child: Image(image: AssetImage('assets/images/teeth.png')),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(top: 10.0),
                  child: Text(
                    'IDental',
                    style: GoogleFonts.lato(
                      textStyle: Theme.of(context).textTheme.headline4,
                      fontSize: 48,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ));
  }
}
