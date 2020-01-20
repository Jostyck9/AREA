using System;
using System.Threading.Tasks;
using Discord;
using Discord.WebSocket;

namespace TestDiscordAPI
{
    class Program
    {
        private DiscordSocketClient _client;
		private readonly string DiscordToken = "NjY4NzU3MjkyNzAyODkyMDg4.XiV-GQ.Ea8BDDps_43RA9Iw4tRx9ENJ6qg";
        static void Main(string[] args) => new Program().MainAsync().GetAwaiter().GetResult();
		public async Task MainAsync()
		{
			_client = new DiscordSocketClient(new DiscordSocketConfig
			{
				LogLevel = LogSeverity.Info
			});

			_client.Log += Log;

			await _client.LoginAsync(TokenType.Bot, "NjY4NzU3MjkyNzAyODkyMDg4.XiV-GQ.Ea8BDDps_43RA9Iw4tRx9ENJ6qg"); //getBotToken
			await _client.StartAsync();

			await Task.Delay(-1);
		}

		private Task Log(LogMessage message)
		{
			Console.WriteLine(message.ToString());
			return Task.CompletedTask;
		}
	}
}
