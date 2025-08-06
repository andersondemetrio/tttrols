import React, { useState, useEffect } from 'react';
import { User, Lock, LogIn } from 'lucide-react';

export default function TrollLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameActive, setIsUsernameActive] = useState(true);
  const [isPasswordActive, setIsPasswordActive] = useState(true);
  const [loginEnabled, setLoginEnabled] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  // Função troll: quando ativa um campo, desativa o outro
  const handleUsernameToggle = (checked) => {
    setIsUsernameActive(checked);
    if (checked) {
      setIsPasswordActive(false);
      setPassword(''); // Limpa o campo quando desativa
      setMessage('Ops! O campo de senha foi desabilitado 😈');
    } else {
      setUsername(''); // Limpa quando desativa
      setMessage('Campo de usuário desabilitado!');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const handlePasswordToggle = (checked) => {
    setIsPasswordActive(checked);
    if (checked) {
      setIsUsernameActive(false);
      setUsername(''); // Limpa o campo quando desativa
      setMessage('Hehe! O campo de usuário sumiu 🤭');
    } else {
      setPassword(''); // Limpa quando desativa
      setMessage('Campo de senha desabilitado!');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  // Mais trollagem: quando ambos estão ativos, desabilita login
  useEffect(() => {
    if (isUsernameActive && isPasswordActive) {
      setLoginEnabled(false);
      setMessage('Ambos ativos? Botão de login bloqueado! 😏');
      setTimeout(() => setMessage(''), 2000);
    } else if (!isUsernameActive && !isPasswordActive) {
      setMessage('Nenhum campo ativo? Como vai fazer login? 🤷‍♂️');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setLoginEnabled(true);
    }
  }, [isUsernameActive, isPasswordActive]);

  const handleLogin = () => {
    setAttempts(prev => prev + 1);
    
    const trollMessages = [
      'Quase lá... tente novamente! 😄',
      'Hmm, algo deu errado... será? 🤔',
      'Login inválido! (Ou será que é? 🤫)',
      'Erro 404: Sucesso não encontrado! 😂',
      'Carregando... só que não! 🎭',
      `Tentativa ${attempts + 1}: Keep trying! 💪`
    ];

    setMessage(trollMessages[attempts % trollMessages.length]);
    
    // Às vezes "quebra" os toggles
    if (attempts > 2 && Math.random() > 0.5) {
      const shouldBreakUsername = Math.random() > 0.5;
      if (shouldBreakUsername) {
        setIsUsernameActive(false);
        setUsername('');
      } else {
        setIsPasswordActive(false);
        setPassword('');
      }
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Login do Amor !</h1>
         
        </div>

        {/* Mensagem de status */}
        {message && (
          <div className="mb-6 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">{message}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Toggle do Username */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Campo Usuário</label>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">
                  {isUsernameActive ? 'Ativo' : 'Inativo'}
                </span>
                <button
                  onClick={() => handleUsernameToggle(!isUsernameActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isUsernameActive ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isUsernameActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!isUsernameActive}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                  isUsernameActive 
                    ? 'bg-white/10 border-white/30 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/50' 
                    : 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Toggle da Senha */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium">Campo Senha</label>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">
                  {isPasswordActive ? 'Ativo' : 'Inativo'}
                </span>
                <button
                  onClick={() => handlePasswordToggle(!isPasswordActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isPasswordActive ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPasswordActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isPasswordActive}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                  isPasswordActive 
                    ? 'bg-white/10 border-white/30 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/50' 
                    : 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Botão de Login */}
          <button
            onClick={handleLogin}
            disabled={!loginEnabled || (!isUsernameActive && !isPasswordActive)}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
              loginEnabled && (isUsernameActive || isPasswordActive)
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <LogIn className="h-5 w-5" />
            <span>
              {!loginEnabled ? 'Bloqueado (ambos ativos!)' : 
               (!isUsernameActive && !isPasswordActive) ? 'Ative um campo!' :
               'Fazer Login'}
            </span>
          </button>

          {/* Contador de tentativas */}
          <div className="text-center pt-4">
            <p className="text-white/60 text-sm">
              Tentativas de login: <span className="font-bold text-yellow-400">{attempts}</span>
            </p>
            <p className="text-white/40 text-xs mt-1">
              Dica: Esta interface foi feita para trollar! 😄
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}