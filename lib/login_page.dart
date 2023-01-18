import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:firebase_ui_auth/firebase_ui_auth.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color.fromRGBO(250, 250, 250, 1),
      child: Column(
        children: <Widget>[
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
          Expanded(
            child: SignInScreen(
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
          ),
        ],
      ),
    );
  }
}
