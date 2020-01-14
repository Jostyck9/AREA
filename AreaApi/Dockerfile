# Build SERVER

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 443
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY ["/AreaApi/AreaApi.csproj", ""]
RUN dotnet restore "./AreaApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AreaApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AreaApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AreaApi.dll"]