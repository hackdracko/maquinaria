<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
class PassportController extends Controller
{
    public $sucessStatus = 200;

    /*
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    public function login() {
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;
            $data = ['token' => $token, 'data' => ['id' => $user['id'], 'username' => $user['email'], 'role' => 'administrador']];
            return response()->json($data, $this->sucessStatus);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /*
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required|users',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            //'c_password' => 'required|same:password',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()],401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['estatus'] = 1;

        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['name'] = $user->name;

        return response()->json(['success' => $success], $this->sucessStatus);
    }

    /*
     * Details api
     *
     * @return \Illumiante\Http\Response
     */
    public function validateToken() {
        $user = Auth::user();
        $token = $user->createToken('MyApp')->accessToken;
        $data = ['token' => $token, 'account' => ['id' =>$user['id'], 'username' => $user['email'], 'role' => 'administrador', 'firstnames' => 'fn', 'lastnames' => 'ln']];
        return response()->json($data, $this->sucessStatus);
    }

}